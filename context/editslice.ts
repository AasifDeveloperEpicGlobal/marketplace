const update = `update`;

type Action = {
  type: string;
  payload: {
    key: string;
    value: any;
  };
};

interface StateType {
  name: string;
  category: string;
  typesOfBussiness: string;
  subTypeOfBussiness: string;
  merchantAddress: string;
  manufacturerPhone: string;
  manufacturerAddress: string;
  brand: string;
  image: any["/"];
  subCategory: string;
  image1: any["/"];
  image2: any["/"];
  image3: any["/"];
  image4: any["/"];
  image5: any["/"];
  source: string;
  source_type: string;
  price: string;
  productSpecification: string;
  additionalSpecification: never[];
  productDescription: string;
  capacity: string;
  deliveryTime: string;
  productCode: string;
  madeIn: string;
  modelNumber: string;
}

const init: StateType = {
  name: "",
  category: "",
  typesOfBussiness: "",
  subTypeOfBussiness: "",
  merchantAddress: "",
  manufacturerPhone: "",
  manufacturerAddress: "",
  brand: "",
  image: [],
  subCategory: "",
  image1: [],
  image2: [],
  image3: [],
  image4: [],
  image5: [],
  price: "",
  productSpecification: "",
  additionalSpecification: [],
  productDescription: "",
  capacity: "",
  deliveryTime: "",
  productCode: "",
  madeIn: "",
  source: "",
  source_type: "",
  modelNumber: "",
};

const editSlice = {
  initialState: init as StateType,
  reducer: (state: StateType, action: Action) => {
    switch (action.type) {
      case update:
        return { ...state, [action.payload.key]: action.payload.value };
      default:
        return state;
    }
  },
  actions: {
    inputField: (key: string, value: any) => ({
      type: update,
      payload: { key: key, value: value },
    }),
  },
};

export default editSlice;

//  payload: { key: event.target.name, value: event.target.value },
