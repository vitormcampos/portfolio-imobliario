export interface Imovel {
  id: number;
  titulo: string;
  descricao: string;
  preco: number;
  metragem: number;
  quartos: number;
  banheiros: number;
  vagas: number;
  tipo: 'casa' | 'apartamento' | 'comercial' | 'terreno';
  finalidade: 'venda' | 'aluguel';
  endereco: string;
  cidade: string;
  estado: string;
  fotos: string[];
  destaque: boolean;
  area: number;
  condominio?: number;
}
