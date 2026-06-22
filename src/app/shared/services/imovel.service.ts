import { Injectable } from '@angular/core';
import { Imovel } from '../models/imovel.model';

@Injectable({
  providedIn: 'root',
})
export class ImovelService {
  private imoveis: Imovel[] = [
    {
      id: 1,
      titulo: 'Casa com Piscina no Jardim América',
      descricao:
        'Linda casa com 4 suítes, piscina, churrasqueira e jardim amplo. Ótima localização, próximo a shoppings e escolas.',
      preco: 1250000,
      metragem: 350,
      quartos: 4,
      banheiros: 4,
      vagas: 3,
      tipo: 'casa',
      finalidade: 'venda',
      endereco: 'Rua das Palmeiras, 450',
      cidade: 'São Paulo',
      estado: 'SP',
      fotos: [
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
        'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80',
        'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
      ],
      destaque: true,
      area: 350,
    },
    {
      id: 2,
      titulo: 'Apartamento 2 Quartos no Centro',
      descricao:
        'Apartamento moderno com 2 quartos, sendo 1 suíte, sacada com vista panorâmica. Próximo ao metrô.',
      preco: 380000,
      metragem: 85,
      quartos: 2,
      banheiros: 2,
      vagas: 1,
      tipo: 'apartamento',
      finalidade: 'venda',
      endereco: 'Av. São João, 1200',
      cidade: 'São Paulo',
      estado: 'SP',
      fotos: [
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
      ],
      destaque: true,
      area: 85,
      condominio: 680,
    },
    {
      id: 3,
      titulo: 'Cobertura Duplex de Alto Padrão',
      descricao:
        'Cobertura duplex com 3 suítes, piscina privativa, terraço com grama e vista 360°. Acabamento premium.',
      preco: 2800000,
      metragem: 420,
      quartos: 3,
      banheiros: 4,
      vagas: 4,
      tipo: 'apartamento',
      finalidade: 'venda',
      endereco: 'Rua da Consolação, 2500',
      cidade: 'São Paulo',
      estado: 'SP',
      fotos: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
      ],
      destaque: true,
      area: 420,
      condominio: 2500,
    },
    {
      id: 4,
      titulo: 'Casa com Churrasqueira em Alphaville',
      descricao:
        'Casa em condomínio fechado com 3 suítes, churrasqueira, piscina e área de lazer completa. 24h de segurança.',
      preco: 890000,
      metragem: 280,
      quartos: 3,
      banheiros: 3,
      vagas: 2,
      tipo: 'casa',
      finalidade: 'venda',
      endereco: 'Alphaville, Alameda dos Sonhos, 800',
      cidade: 'Barueri',
      estado: 'SP',
      fotos: [
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      ],
      destaque: true,
      area: 280,
    },
    {
      id: 5,
      titulo: 'Sala Comercial na Faria Lima',
      descricao:
        'Sala comercial de 50m² com vista para a Av. Faria Lima. Ótimo para escritório, consultório ou base comercial.',
      preco: 450000,
      metragem: 50,
      quartos: 0,
      banheiros: 1,
      vagas: 1,
      tipo: 'comercial',
      finalidade: 'venda',
      endereco: 'Av. Brigadeiro Faria Lima, 1800',
      cidade: 'São Paulo',
      estado: 'SP',
      fotos: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
      ],
      destaque: true,
      area: 50,
      condominio: 1200,
    },
    {
      id: 6,
      titulo: 'Terreno 500m² em Condomínio Fechado',
      descricao:
        'Terreno plano de 500m² em condomínio fechado com infraestrutura completa. Ideal para construir casa dos sonhos.',
      preco: 320000,
      metragem: 500,
      quartos: 0,
      banheiros: 0,
      vagas: 0,
      tipo: 'terreno',
      finalidade: 'venda',
      endereco: 'Estrada Municipal, km 15',
      cidade: 'Cotia',
      estado: 'SP',
      fotos: [
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
        'https://picsum.photos/seed/terreno-cotia/800/600',
      ],
      destaque: true,
      area: 500,
    },
    {
      id: 7,
      titulo: 'Casa Térrea com Quintal',
      descricao:
        'Casa térrea com 3 quartos, quintal grande, ideal para famílias. Bairro tranquilo com comércio local.',
      preco: 1200,
      metragem: 160,
      quartos: 3,
      banheiros: 2,
      vagas: 2,
      tipo: 'casa',
      finalidade: 'aluguel',
      endereco: 'Rua das Flores, 320',
      cidade: 'Osasco',
      estado: 'SP',
      fotos: [
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
        'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
      ],
      destaque: false,
      area: 160,
    },
    {
      id: 8,
      titulo: 'Apartamento 1 Quarto para Alugar',
      descricao:
        'Apartamento compacto e bem localizado, ideal para solteiros ou casais. Prédio com portaria 24h.',
      preco: 1800,
      metragem: 40,
      quartos: 1,
      banheiros: 1,
      vagas: 0,
      tipo: 'apartamento',
      finalidade: 'aluguel',
      endereco: 'Rua Augusta, 500',
      cidade: 'São Paulo',
      estado: 'SP',
      fotos: [
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      ],
      destaque: false,
      area: 40,
      condominio: 350,
    },
    {
      id: 9,
      titulo: 'Ponto Comercial em Avenida Movimentada',
      descricao:
        'Ponto comercial com 30m² em avenida de alto fluxo. Ideal para loja, lanchonete ou prestação de serviços.',
      preco: 3500,
      metragem: 30,
      quartos: 0,
      banheiros: 1,
      vagas: 0,
      tipo: 'comercial',
      finalidade: 'aluguel',
      endereco: 'Av. Brasil, 950',
      cidade: 'São Paulo',
      estado: 'SP',
      fotos: [
        'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
      ],
      destaque: false,
      area: 30,
      condominio: 400,
    },
    {
      id: 10,
      titulo: 'Terreno com Vista para o Mar',
      descricao:
        'Terreno com 600m² em condomínio de alto padrão com vista deslumbrante para o mar. Região valorizada.',
      preco: 780000,
      metragem: 600,
      quartos: 0,
      banheiros: 0,
      vagas: 0,
      tipo: 'terreno',
      finalidade: 'venda',
      endereco: 'Av. Beira Mar, s/n',
      cidade: 'Santos',
      estado: 'SP',
      fotos: [
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
        'https://picsum.photos/seed/terreno-santos/800/600',
      ],
      destaque: false,
      area: 600,
    },
  ];

  getImoveis(): Imovel[] {
    return this.imoveis;
  }

  getImoveisDestaque(): Imovel[] {
    return this.imoveis.filter((i) => i.destaque);
  }

  getImovelById(id: number): Imovel | undefined {
    return this.imoveis.find((i) => i.id === id);
  }
}
