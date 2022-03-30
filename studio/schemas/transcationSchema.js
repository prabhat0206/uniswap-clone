export default {
  name: "transactions",
  title: "Transcations",
  type: "document",
  fields: [
    {
      name: "from",
      title: "From Account",
      type: "string",
    },
    {
      name: "to",
      title: "To Account",
      type: "string",
    },
    {
      name: "amount",
      title: "Amount",
      type: "number",
    },
    {
      name: "date",
      title: "Timestamp",
      type: "datetime",
    },
    {
      name: "txHash",
      title: "Transcation Hash",
      type: "string",
    },
  ],
};
