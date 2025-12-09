export interface Alert {
    uuid?: string;
    estado?: boolean;

    tipo: string;
    mensaje: string;
    fechaAlerta: Date | string;
    uuidDestinatario: string;
    rolDestinatario: string;
    esLeido: boolean;
    notificacionDto?: Notification;
  }