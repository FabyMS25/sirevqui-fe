// tslint:disable-next-line: class-name
export class arrayModel {
  key!: string;
  value!: string;
}

// tslint:disable-next-line: class-name
export class productModel {
  id!: number;
  name!: string;
  category!: string;
  seller!: string;
  published!: string;
  ratings = 0;
  reviewCount = 0;
  price?: number;
  orders!: number;
  stocks!: number;
  revenue!: number;
  sizes?: arrayModel[];
  colors?: arrayModel[];
  description!: string;
  features!: string[];
  services!: string[];
  images!: string[];
  colorVariant!: arrayModel[];
  manufacture_name?: string;
  manufacture_brand?: string;
}

// tslint:disable-next-line: class-name
export class filterObject {
  discountRates!: number[];
  maxVal!: number;
  minVal!: number;
}

export const productList: productModel[] = [
  {
      id: 1,
      images: ['assets/images/products/img-8.png', 'assets/images/products/img-6.png', 'assets/images/products/img-1.png','assets/images/products/img-8.png'],
      name: 'Full Sleeve Sweatshirt for Men (Pink)',
      category: 'Tommy Hilfiger',
      seller: 'Zoetic Fashion',
      published: '26 Mar, 2021',
      ratings: 4,
      reviewCount: 5.50,
      price: 120.40,
      orders: 2234,
      stocks: 1230,
      revenue: 60645,
      sizes: [{
        key: 'Out of Stock',
        value: 'S'
      },
      {
          key: '04 Items Available',
          value: 'M'
      },
      {
        key: '06 Items Available',
        value: 'L'
      },
      {
        key: 'Out of Stock',
        value: 'XL'
      }],
      colors: [{
        key: 'Out of Stock',
        value: 'text-primary'
      },
      {
          key: '03 Items Available',
          value: 'text-secondary'
      },
      {
        key: '03 Items Available',
        value: 'text-success'
      },
      {
        key: '02 Items Available',
        value: 'text-info'
      },
      {
        key: '04 Items Available',
        value: 'text-danger'
      },
      {
        key: '03 Items Available',
        value: 'text-body'
      },
      {
        key: '01 Items Available',
        value: 'text-warning'
      },
      {
        key: '04 Items Available',
        value: 'text-body'
      }],
      description: 'Tommy Hilfiger men striped pink sweatshirt. Crafted with cotton. Material composition is 100% organic cotton. This is one of the world’s leading designer lifestyle brands and is internationally recognized for celebrating the essence of classic American cool style, featuring preppy with a twist designs.',
      features: ['Full Sleeve', 'Full Sleeve', 'All Sizes available', '4 Different Color'],
      services: ['10 Days Replacement', 'Cash on Delivery available'],
      colorVariant: [{
          key: 'Gray',
          value: 'assets/images/product/img-1.png'
      },
      {
          key: 'Dark',
          value: 'assets/images/product/img-2.png'
      },
      {
        key: 'Purple',
        value: 'assets/images/product/img-3.png'
      }],
  }
];
