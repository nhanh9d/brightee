import { registerEnumType } from "@nestjs/graphql";

export enum Service {
  Delivery = 'Delivery',
  PickUp = 'Pick-up',
  Payment = 'Payment',
}

registerEnumType(Service, {
  name: 'Service',
});