
import { toast } from "nextjs-toast-notify";

export function miToast(msj, type) {
    toast[type](msj, {
      duration: 5000,
      progress: true,
      position: "bottom-center",
      transition: "bounceIn",
      icon: '',
      sound: true,
    });
}