import { formatOrderedProduct } from '@/lib/format-ordered-product';
import { useAtom } from 'jotai';
import {
  billingAddressAtom,
  orderMessageAtom,
  orderRecipientNameAtom,
  orderRecipientPhoneAtom,
  shippingAddressAtom,
} from '@/store/checkout';
import Button from '@/components/ui/button';
import { useCart } from '@/store/quick-cart/cart.context';
import classNames from 'classnames';
import { useVerifyOrder } from '@/framework/order';
import omit from 'lodash/omit';

export const CheckAvailabilityAction: React.FC<{
  className?: string;
  children?: React.ReactNode;
}> = (props) => {
  const [billing_address] = useAtom(billingAddressAtom);
  const [shipping_address] = useAtom(shippingAddressAtom);

  const [message] = useAtom(orderMessageAtom);
  const [recipient_name] = useAtom(orderRecipientNameAtom);
  const [recipient_phone] = useAtom(orderRecipientPhoneAtom);

  const { items, total, isEmpty } = useCart();

  const { mutate: verifyCheckout, isLoading: loading }: any = useVerifyOrder();

  function handleVerifyCheckout() {
    verifyCheckout({
      amount: total,
      products: items?.map((item) => formatOrderedProduct(item)),
      billing_address: {
        ...(billing_address?.address &&
          omit(billing_address.address, ['__typename'])),
      },
      shipping_address: {
        ...(shipping_address?.address &&
          omit(shipping_address.address, ['__typename'])),
      },
      //message?:message
      //message_to?: message_to;
      //message_from?: message_from;
      //? recipient_name: recipient_name,
      //? recipient_phone: recipient_phone,
      //recipient_note?: recipient_note;
    });
  }

  return (
    <>
      <Button
        loading={loading}
        className={classNames('mt-5 w-full', props.className)}
        onClick={handleVerifyCheckout}
        disabled={isEmpty || loading}
        {...props}
      />
    </>
  );
};
