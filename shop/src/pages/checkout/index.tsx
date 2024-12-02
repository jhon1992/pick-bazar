import { useTranslation } from 'next-i18next';
import { billingAddressAtom, shippingAddressAtom } from '@/store/checkout';
import dynamic from 'next/dynamic';
import { getLayout } from '@/components/layouts/layout';
import { AddressType } from '@/framework/utils/constants';
import Seo from '@/components/seo/seo';
import { useUser } from '@/framework/user';
//import OrderNote from '@/components/checkout/order-note';
import OrderUser from '@/components/checkout/order-user';
import OrderMessage from '@/components/checkout/order-message';
import OrderNote from '@/components/checkout/order-note';
import OrderRecipient from '@/components/checkout/order-recipient';
import DatePicker from '@/components/ui/date-picker';

export { getStaticProps } from '@/framework/general.ssr';

const ScheduleGrid = dynamic(
  () => import('@/components/checkout/schedule/schedule-grid'),
);
const DeliveryInformationGrid = dynamic(
  () =>
    import(
      '@/components/checkout/delivery-information/delivery-information-grid'
    ),
);

const AddressGrid = dynamic(
  () => import('@/components/checkout/address-grid'),
  { ssr: false },
);
const ContactGrid = dynamic(
  () => import('@/components/checkout/contact/contact-grid'),
  // { ssr: false }
);
const RightSideView = dynamic(
  () => import('@/components/checkout/right-side-view'),
  { ssr: false },
);

export default function CheckoutPage() {
  const { t } = useTranslation();
  const { me } = useUser();
  const { id, address, profile } = me ?? {};
  let count = 1;
  return (
    <>
      <Seo noindex={true} nofollow={true} />
      <div className="bg-gray-100 px-4 py-8 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20">
        <div className="m-auto flex w-full max-w-5xl flex-col items-center rtl:space-x-reverse lg:flex-row lg:items-start lg:space-x-8">
          <div className="w-full space-y-6 lg:max-w-2xl">
            <ContactGrid
              className="bg-light p-5 shadow-700 md:p-8"
              contact={profile?.contact}
              label={t('text-contact-number')}
              count={count++}
            />

            <OrderUser
              //count={count++}
              label={t('text-user-information')}
            />

            <DeliveryInformationGrid
              className="bg-light p-5 shadow-700 md:p-8"
              label={t('text-delivery-information')}
              count={count++}
            />

            {/*
            <AddressGrid
              userId={id!}
              className="bg-light p-5 shadow-700 md:p-8"
              label={t('text-billing-address')}
              count={count++}
              //@ts-ignore
              addresses={address?.filter(
                (item) => item?.type === AddressType.Billing,
              )}
              //@ts-ignore
              atom={billingAddressAtom}
              type={AddressType.Billing}
            />
              */}
            <AddressGrid
              userId={me?.id!}
              className="bg-light p-5 shadow-700 md:p-8"
              label={t('text-shipping-address')}
              count={count++}
              //@ts-ignore
              addresses={address?.filter(
                (item) => item?.type === AddressType.Shipping,
              )}
              //@ts-ignore
              atom={shippingAddressAtom}
              type={AddressType.Shipping}
            />

            <ScheduleGrid
              className="bg-light p-5 shadow-700 md:p-8"
              label={t('text-delivery-schedule')}
              count={count++}
            />

            {/*
            <OrderNote count={5} label={t('Order Note')} />
            */}
            <OrderRecipient
              count={count++}
              label={t('text-recipient-information')}
            />
            <OrderMessage count={count++} label={t('text-order-message')} />
          </div>
          <div className="mt-10 mb-10 w-full sm:mb-12 lg:mb-0 lg:w-96">
            <RightSideView />
          </div>
        </div>
      </div>
    </>
  );
}
CheckoutPage.authenticationRequired = true;
CheckoutPage.getLayout = getLayout;
