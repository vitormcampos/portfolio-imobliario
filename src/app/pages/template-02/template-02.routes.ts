import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ImoveisComponent } from './pages/imoveis/imoveis.component';
import { ImovelComponent } from './pages/imovel/imovel.component';
import { ContatoComponent } from './pages/contato/contato.component';
import { TermosComponent } from './pages/termos/termos.component';
import { PrivacidadeComponent } from './pages/privacidade/privacidade.component';

export const template02Routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: HomeComponent },
      { path: 'imoveis', component: ImoveisComponent },
      { path: 'imovel/:id', component: ImovelComponent },
      { path: 'contato', component: ContatoComponent },
      { path: 'termos', component: TermosComponent },
      { path: 'privacidade', component: PrivacidadeComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
];
