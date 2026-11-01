/**
 * Dual-Currency Syndication & Retainer Invoicing Engine
 * Handles INR (UPI) and USD (PayPal) billing, GST calculation, and LUT compliance.
 */

export interface SyndicationInvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  licenseTier: 'single_story' | 'monthly_pack' | 'retainer';
}

export interface SyndicationInvoiceCalculation {
  invoiceId: string;
  currency: 'INR' | 'USD';
  items: SyndicationInvoiceItem[];
  subtotal: number;
  taxGstAmount: number;
  total: number;
  lutZeroRated: boolean;
  paymentInstructions: {
    method: 'UPI' | 'PayPal';
    coordinate: string;
    note: string;
  };
}

export class SyndicationInvoicingEngine {
  public generateInvoice(
    items: SyndicationInvoiceItem[],
    currency: 'INR' | 'USD',
    isInternationalClient: boolean
  ): SyndicationInvoiceCalculation {
    const subtotal = items.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);
    const invoiceId = `INV-DJ-${Date.now().toString(36).toUpperCase()}`;

    let taxGstAmount = 0;
    let lutZeroRated = false;

    if (currency === 'INR' || !isInternationalClient) {
      taxGstAmount = Number((subtotal * 0.18).toFixed(2)); // 18% GST for domestic clients
    } else {
      lutZeroRated = true; // Export of service with LUT declaration (0% GST)
    }

    const total = Number((subtotal + taxGstAmount).toFixed(2));

    const paymentInstructions = currency === 'INR'
      ? {
          method: 'UPI' as const,
          coordinate: 'milind.chatrabhuji@okhdfcbank',
          note: 'Domestic UPI payment. Remit exact amount to milind.chatrabhuji@okhdfcbank.'
        }
      : {
          method: 'PayPal' as const,
          coordinate: 'milind.chatrabhuji@gmail.com',
          note: 'International PayPal payment in USD. Zero-rated service export under LUT.'
        };

    return {
      invoiceId,
      currency,
      items,
      subtotal,
      taxGstAmount,
      total,
      lutZeroRated,
      paymentInstructions
    };
  }
}
