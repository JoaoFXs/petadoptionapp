export class Pet {
  id?: string;
  url?: string;
  name?: string;
  age?: number;
  type?: string;
  breed?: string;
  sex?: string;
  size?: string;
  weight?: number;
  photo?: Blob | string;
  neutered?: boolean;
  vaccinated?: boolean;
  dewormed?: boolean;
  diseases?: string;
  specialNeeds?: string;
  temperament?: string;
  socialWith?: string;
  available?: boolean;
  availabilityDate?: string; 
  adoptedByUser?: Pet; 
  adoptionDate?: string;
  rescueLocation?: string;
  history?: string;
  microchip?: boolean;
  notes?: string;
  tags?: string;
}
