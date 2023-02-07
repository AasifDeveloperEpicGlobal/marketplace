export interface FormProps {
    isNext: (value: boolean) => void;
    handleState: (value: any) => void;
    value: any;
    handleStep: (value: number) => void;
  }
  