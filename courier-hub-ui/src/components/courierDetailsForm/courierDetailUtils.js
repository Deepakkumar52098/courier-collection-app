export const initialData = {
  senderName: "",
  senderPhone: "",
  senderAddress: "",
  senderState: "",
  senderCity: "",
  senderPincode: "",

  receiverName: "",
  receiverPhone: "",
  receiverAddress: "",
  receiverState: "",
  receiverCity: "",
  receiverPincode: "",

  weight: "",
  region: "",
  packageType: "",

  billingName: "",
  billingAddress: "",
  sameAsSenderAddress: false,
  paymentMode: "",

  shippingCharges: 80,
  packageCharges: 0,
  totalAmount: 80,
};
export const senderFields = [
  {
    label: "Sender Name",
    key: "senderName",
    type: "text",
    placeholder: "Enter sender name",
  },
  {
    label: "Sender Phone",
    key: "senderPhone",
    type: "text",
    placeholder: "Enter sender phone",
  },
  {
    label: "Sender Address",
    key: "senderAddress",
    type: "text",
    placeholder: "Enter sender address",
  },
  {
    label: "State",
    key: "senderState",
    type: "text",
    placeholder: "Enter state",
  },
  {
    label: "City",
    key: "senderCity",
    type: "text",
    placeholder: "Enter city",
  },
  {
    label: "Pincode",
    key: "senderPincode",
    type: "text",
    placeholder: "Enter pincode",
  },
];

export const receiverFields = [
  {
    label: "Receiver Name",
    key: "receiverName",
    type: "text",
    placeholder: "Enter receiver name",
  },
  {
    label: "Receiver Phone",
    key: "receiverPhone",
    type: "text",
    placeholder: "Enter receiver phone",
  },
  {
    label: "Receiver Address",
    key: "receiverAddress",
    type: "text",
    placeholder: "Enter receiver address",
  },
  {
    label: "State",
    key: "receiverState",
    type: "text",
    placeholder: "Enter state",
  },
  {
    label: "City",
    key: "receiverCity",
    type: "text",
    placeholder: "Enter city",
  },
  {
    label: "Pincode",
    key: "receiverPincode",
    type: "text",
    placeholder: "Enter pincode",
  },
];

export const packageFields = [
  {
    label: "Weight (kg)",
    key: "weight",
    type: "number",
    placeholder: "Enter package weight",
  },
  {
    label: "Region",
    key: "region",
    type: "select",
    options: [
      { label: "TVM South", value: "TVM South" },
      { label: "TVM North", value: "TVM North" },
      { label: "TVM East", value: "TVM East" },
      { label: "TVM West", value: "TVM West" },
    ],
  },
  {
    label: "Package Type",
    key: "packageType",
    type: "select",
    options: [
      { label: "Document", value: "document" },
      { label: "Fragile", value: "fragile" },
      { label: "Electronics", value: "electronics" },
      { label: "Clothing", value: "clothing" },
    ],
  },
];

export const billingFields = [
  {
    label: "Billing Name",
    key: "billingName",
    type: "text",
    placeholder: "Enter billing name",
  },
  {
    label: "Same as Sender Address",
    key: "sameAsSenderAddress",
    type: "checkbox",
  },
  {
    label: "Billing Address",
    key: "billingAddress",
    type: "text",
    placeholder: "Enter billing address",
  },
  {
    label: "Payment Mode",
    key: "paymentMode",
    type: "select",
    options: [
      { label: "Cash", value: "cash" },
      { label: "UPI", value: "upi" },
      { label: "Card", value: "card" },
    ],
  },
];
