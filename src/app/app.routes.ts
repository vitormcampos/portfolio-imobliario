import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'template-01',
    loadChildren: () =>
      import('./pages/template-01/template-01.routes').then(
        (m) => m.template01Routes
      ),
  },
  { path: '**', redirectTo: 'template-01' },
];
