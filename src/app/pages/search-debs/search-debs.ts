import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '../../core/services/store';
import { StoreList } from '../../core/models/StoreList';
import { FormatNumberPipe } from '../../shared/pipes/format-number.pipe';

@Component({
  selector: 'app-search-debs',
  imports: [CommonModule, ReactiveFormsModule, FormatNumberPipe],
  templateUrl: './search-debs.html',
  styleUrl: './search-debs.scss',
})
export class SearchDebs {
  form!: FormGroup;
  debts = signal<StoreList[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      ci: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  async searchDebts() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set(null);
    this.debts.set([]);

    try {
      const ci = this.form.get('ci')?.value;
      const result = await this.store.getPending(ci);
      this.debts.set(result);
    } catch (err: any) {
      console.error('Error al buscar deudas: ', err);
      this.error.set('Error al buscar las deudas. Por favor, intente nuevamente.');
    } finally {
      this.loading.set(false);
    }
  }

  get ci() {
    return this.form.get('ci');
  }

  openPaymentUrl(payUrl: string | undefined) {
    if (payUrl) {
      window.open(payUrl, '_blank');
    }
  }
}
