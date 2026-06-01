export const pendingPickupMapping = Object.freeze({
  tracking_id: "Tracking ID",
  sender_name: "Sender",
  receiver_name: "Receiver",
  sender_city: "From",
  receiver_city: "To",
  weight: "Weight (kg)",
  created_at: "Created At",
});

export const activeDeliveriesMapping = Object.freeze({
  tracking_id: "Tracking ID",
  region: "Current Region",
  current_status: "Status",
  updated_at: "Updated At",
});

export const deliveredPackagesMapping = Object.freeze({
  tracking_id: "Tracking ID",
  sender_city: "From",
  receiver_city: "To",
  weight: "Weight (kg)",
  updated_at: "Updated At",
});

export const delayedPackagesMapping = Object.freeze({
  tracking_id: "Tracking ID",
  region: "Current Region",
  reason: "Reason",
  delay_duration: "Delay Duration",
  updated_at: "Updated At",
});
