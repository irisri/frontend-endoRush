export default {
  toastMsg,
  resetToast,
};

function toastMsg(that, payload) {
  that.$toasted.show(payload.msg, {
    className: "alert-toast",
    icon: payload.icon,
    duration: 15000,
    className: ["alert-toast"],
    position: "bottom-right",
  });
}

function resetToast(that) {
  that.$toasted.clear();
}
