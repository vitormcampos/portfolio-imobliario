import { Injectable, signal } from '@angular/core';
import { Site } from '../models/site.model';

@Injectable({
  providedIn: 'root',
})
export class SiteService {
  private siteSignal = signal<Site>({
    logo: 'https://app.procorretor.com/upload/site/16/b4eb8ec0-9b19-4d38-a404-8e487739f609.png',
    nome: 'Visa Empreendimentos Imobiliários',
    slogan: 'Sua imobiliária em Cuiabá',
    telefone: '(65) 3322-3556',
    celular: '(65) 99954-5667',
    email: 'contato@visaimob.com.br',
    urlFacebook: 'https://www.facebook.com/visaimobiliariamt',
    urlInstagram: 'https://www.instagram.com/visaimobmt/',
    urlWhatsapp: 'https://wa.me/5565999545667',
    endereco:
      'Av. Presidente Marques, 882, Térreo, Centro, Cuiabá/MT - CEP: 78.045-175',
    sobre:
      'A Visa Empreendimentos Imobiliários é uma imobiliária com vasta experiência no mercado de Cuiabá e região, oferecendo soluções completas para compra, venda e aluguel de imóveis residenciais, comerciais e terrenos.',
  });

  readonly site = this.siteSignal.asReadonly();
}
