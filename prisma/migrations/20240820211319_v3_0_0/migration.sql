-- AlterTable
CREATE SEQUENCE payment_paymentid_seq;
ALTER TABLE "Payment" ALTER COLUMN "paymentID" SET DEFAULT nextval('payment_paymentid_seq');
ALTER SEQUENCE payment_paymentid_seq OWNED BY "Payment"."paymentID";
