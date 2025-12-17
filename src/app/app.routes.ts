import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { CreateDebs } from './pages/create-debs/create-debs';

export const routes: Routes = [
    { path: '', component: HomePage },
    { path: 'create', component: CreateDebs },
];
