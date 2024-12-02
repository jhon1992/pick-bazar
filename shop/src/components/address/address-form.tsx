import Button from '@/components/ui/button';
import Input from '@/components/ui/forms/input';
import Label from '@/components/ui/forms/label';
import Radio from '@/components/ui/forms/radio/radio';
import { Controller } from 'react-hook-form';
import TextArea from '@/components/ui/forms/text-area';
import { useTranslation } from 'next-i18next';
import * as yup from 'yup';
import { useModalState } from '@/components/ui/modal/modal.context';
import { Form } from '@/components/ui/forms/form';
import { AddressType } from '@/framework/utils/constants';
import { GoogleMapLocation } from '@/types';
import { useUpdateUser } from '@/framework/user';
import GooglePlacesAutocomplete from '@/components/form/google-places-autocomplete';
import { useSettings } from '@/framework/settings';

type FormValues = {
  title: string;
  type: AddressType;
  address: {
    country: string;
    city: string;
    state: string;
    zip: string;
    street_address: string;
    delivery_distance: number;
  };
  location: GoogleMapLocation;
};

const addressSchema = yup.object().shape({
  type: yup
    .string()
    .oneOf([AddressType.Billing, AddressType.Shipping])
    .required('error-type-required'),
  title: yup.string().required('error-title-required'),
  //location: yup.string().required('error-location-required'),
  address: yup.object().shape({
    //country: yup.string().required('error-country-required'),
    //city: yup.string().required('error-city-required'),
    //state: yup.string().required('error-state-required'),
    //zip: yup.string().required('error-zip-required'),
    street_address: yup.string().required('error-street-required'),
    delivery_distance: yup.string().required('error-distance-required'),
  }),
});

export const AddressForm: React.FC<any> = ({
  onSubmit,
  defaultValues,
  isLoading,
}) => {
  const { t } = useTranslation('common');
  const { settings } = useSettings();
  //centro de la ciudad segun la tienda.
  const downtown: { lat: number; lng: number } = {
    lat: -8.1119424,
    lng: -79.0288934,
  };
  return (
    <Form<FormValues>
      onSubmit={onSubmit}
      className="grid h-full grid-cols-2 gap-5"
      //@ts-ignore
      validationSchema={addressSchema}
      useFormProps={{
        shouldUnregister: true,
        defaultValues,
      }}
      resetValues={defaultValues}
    >
      {({ register, control, getValues, setValue, formState: { errors } }) => {
        return (
          <>
            <div>
              <Label>{t('text-type')}</Label>
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <Radio
                  id="billing"
                  {...register('type')}
                  type="radio"
                  value={AddressType.Billing}
                  label={t('text-billing')}
                />
                <Radio
                  id="shipping"
                  {...register('type')}
                  type="radio"
                  value={AddressType.Shipping}
                  label={t('text-shipping')}
                />
              </div>
            </div>
            <Input
              label={t('text-title')}
              {...register('title')}
              error={t(errors.title?.message!)}
              variant="outline"
              className="col-span-2"
            />
            {
              //@ts-ignore
              settings?.useGoogleMap && (
                <div className="col-span-2">
                  <Label>{t('text-location')}</Label>
                  <Controller
                    control={control}
                    name="location"
                    render={({ field: { onChange } }) => (
                      <GooglePlacesAutocomplete
                        register={register}
                        downtown={downtown}
                        // @ts-ignore
                        onChange={(location: any) => {
                          onChange(location);
                          console.log('onChange.location', location);
                          setValue('address.country', location?.country);
                          setValue('address.city', location?.city);
                          setValue('address.state', location?.state);
                          setValue('address.zip', location?.zip);

                          //la direccion deben ingresarla !!
                          /*
                          setValue(
                            'address.street_address',
                            location?.street_address,
                          );
                          */

                          const delivery = Math.ceil(
                            10 + (location?.distance / 1000) * 2,
                          );
                          setValue(
                            'address.delivery_distance',
                            location?.distance,
                          );

                          //formattedAddress
                        }}
                        data={getValues('location')!}
                      />
                    )}
                  />
                </div>
              )
            }

            <Input
              //label={t('text-delivery-distance')}
              {...register('address.delivery_distance')}
              error={t(errors.address?.delivery_distance?.message!)}
              variant="outline"
              type="hidden"
            />
            <Input
              //label={t('text-country')}
              {...register('address.country')}
              error={t(errors.address?.country?.message!)}
              variant="outline"
              type="hidden"
            />
            {/*
            <Input
              //label={t('text-delivery-distance')}
              {...register('address.delivery_distance')}
              error={t(errors.address?.country?.message!)}
              variant="outline"
              type="hidden"
            />
            <Input
              //label={t('text-country')}
              {...register('address.country')}
              error={t(errors.address?.country?.message!)}
              variant="outline"
              type="hidden"
            />
            <Input
              //label={t('text-city')}
              {...register('address.city')}
              error={t(errors.address?.city?.message!)}
              variant="outline"
              type="hidden"
            />
            <Input
              //label={t('text-state')}
              {...register('address.state')}
              error={t(errors.address?.state?.message!)}
              variant="outline"
              type="hidden"
            />
            <Input
              //label={t('text-zip')}
              {...register('address.zip')}
              error={t(errors.address?.zip?.message!)}
              variant="outline"
              type="hidden"
            />
            */}

            <div className="mb flex col-span-2">
              <span className="text-sm text-body">
                {
                  'Ingresar dirección de entrega y referencia, esto es requisito fundamental.'
                }
              </span>
            </div>
            <TextArea
              label={t('text-street-address')}
              {...register('address.street_address')}
              error={t(errors.address?.street_address?.message!)}
              variant="outline"
              className="col-span-2"
            />
            <Button
              className="w-full col-span-2"
              loading={isLoading}
              disabled={isLoading}
            >
              {Boolean(defaultValues) ? t('text-update') : t('text-save')}{' '}
              {t('text-address')}
            </Button>
          </>
        );
      }}
    </Form>
  );
};

export default function CreateOrUpdateAddressForm() {
  const { t } = useTranslation('common');
  const {
    data: { customerId, address, type },
  } = useModalState();

  const { mutate: updateProfile } = useUpdateUser();

  const onSubmit = (values: FormValues) => {
    const formattedInput = {
      id: address?.id,
      // customer_id: customerId,
      title: values.title,
      type: values.type,
      address: {
        ...values.address,
      },
      location: values.location,
    };
    updateProfile({
      id: customerId,
      address: [formattedInput],
    });
  };

  return (
    <div className="min-h-screen p-5 bg-light sm:p-8 md:min-h-0 md:rounded-xl">
      <h1 className="mb-4 text-lg font-semibold text-center text-heading sm:mb-6">
        {address ? t('text-update') : t('text-add-new')} {t('text-address')}
      </h1>
      <AddressForm
        onSubmit={onSubmit}
        defaultValues={{
          title: address?.title ?? '',
          type: address?.type ?? type,
          address: {
            city: address?.address?.city ?? '',
            country: address?.address?.country ?? '',
            state: address?.address?.state ?? '',
            zip: address?.address?.zip ?? '',
            street_address: address?.address?.street_address ?? '',
            ...address?.address,
          },
          location: address?.location ?? '',
        }}
      />
    </div>
  );
}
