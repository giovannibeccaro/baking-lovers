export type DataType = {
  id: string;
  sms_phone: string;
};

export type CorrectedDataType = {
  id: string;
  correctNum: string;
  correction: string;
  oldNum: string;
};

export type ProductType = {
  prodName: string;
  price: string;
  quantity: string;
  image: string;
  date: string;
  ingredientList: string[];
  id: string;
  expirationDate: string;
};
export type ProductTypeNoId = {
  prodName: string;
  price: string;
  quantity: string;
  image: string;
  date: string;
  ingredientList: string[];
};
