import { Component, OnInit, signal } from '@angular/core';
import { Store } from '../../core/services/store';
import { Products } from '../../core/models/Products';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StoreDebs } from '../../core/models/StoreDebs';

@Component({
  selector: 'app-create-debs',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-debs.html',
  styleUrl: './create-debs.scss',
})
export class CreateDebs implements OnInit {
  products = signal<Products[]>([])
  loadingProducts = signal<Boolean>(true);
  response = signal<any>(null);
  loading = signal<Boolean>(false);
  payUrl = signal<string | null>(null);

  form!: FormGroup

  constructor(
    private store: Store,
    private fb: FormBuilder
  ) {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      client: this.fb.group({
        type: ['', [Validators.required]],
        number: ['', [Validators.required]],
        label: ['', [Validators.required]]
      }),
      products: this.fb.array([])
    });
  }

  generateLabel(clientNumber: string): string {
    const now = new Date();
    const dateTimeString = now.toISOString().replace('T', ' ').substring(0, 19);
    return `${clientNumber}_${dateTimeString}`;
  }

  get productsFormArray(): FormArray {
    return this.form.get('products') as FormArray;
  }

  openPaymentUrl() {
    const url = this.payUrl();
    if (url) {
      window.open(url, '_blank');
    }
  }

  addProduct() {
    const productGroup = this.fb.group({
      id: ['', [Validators.required]],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
    this.productsFormArray.push(productGroup);
  }

  removeProduct(index: number) {
    this.productsFormArray.removeAt(index);
  }

  async ngOnInit() {
    try{
      const resp = await this.store.getProducts()
      this.products.set(resp)
    } catch (err) {
      console.error('Error el obtener productos: ', err)
    } finally {
      this.loadingProducts.set(false)
    }
  }

  async makeStore() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.response.set(null);
    this.payUrl.set(null);

    try {
      const formValue = this.form.value;
      const label = this.generateLabel(formValue.client.number);
      
      const body: StoreDebs = {
        label: label,
        client: {
          type: formValue.client.type,
          number: formValue.client.number,
          label: formValue.client.label
        },
        products: formValue.products.map((p: any) => ({
          id: p.id,
          quantity: p.quantity
        }))
      };

      const resp = await this.store.store(body);
      this.response.set(resp);
      
      // Extraer el payUrl de la respuesta
      if (resp?.debt?.payUrl) {
        this.payUrl.set(resp.debt.payUrl);
      }
    } catch (err) {
      console.error('Error al crear compra: ', err);
      this.response.set({ error: err });
      this.payUrl.set(null);
    } finally {
      this.loading.set(false);
    }
  }

}
