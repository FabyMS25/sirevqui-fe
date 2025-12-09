// Estados de Reserva (estadoReserva)
export enum EstadoReserva { 
  BORRADOR = 'BORRADOR',           // Draft, not submitted yet
  SOLICITADA = 'SOLICITADA',       // Requested, pending approval
  PENDIENTE = 'PENDIENTE',         // Approved, waiting for payment/confirmation
  RECHAZADA = 'RECHAZADA',         // Rejected by admin/manager
  PAGADA = 'PAGADA',               // Payment verified in RUAT (ready to use)
  EN_CURSO = 'EN_CURSO',           // Currently active during scheduled time
  COMPLETADA = 'COMPLETADA',       // Successfully completed
  CANCELADA = 'CANCELADA',         // Cancelled by user/admin before start
  EXPIRADA = 'EXPIRADA',           // Didn't complete payment in time
  NO_SHOW = 'NO_SHOW'              // User didn't show up
}
// Estados de Validación (estadoValidacion)
export enum EstadoValidacion {
  // NO_REQUIERE = 'NO_REQUIERE',     // Campo no requiere aprobación
  PENDIENTE = 'PENDIENTE',         // Esperando aprobación
  APROBADA = 'APROBADA',           // Aprobada por encargado/admin
  RECHAZADA = 'RECHAZADA',         // Rechazada
}
// Estados de Pago (estadoPago)
export enum EstadoPago {
  PENDIENTE = 'PENDIENTE',        // No pagado
  PAGADO = 'PAGADO',              // Pagado y verificado
  PARCIAL = 'PARCIAL',            // Pago parcial (para recurrentes)
  VERIFICANDO = 'VERIFICANDO',    // Consultando RUAT
  REEMBOLSADO = 'REEMBOLSADO',    // Devuelto por cancelación
  VENCIDO = 'VENCIDO'             // Tiempo de pago expiró
}
// Estados de Usuario (estadoUsuario)
export enum EstadoUsuario {
  PENDIENTE_VERIFICACION = 'PENDIENTE_VERIFICACION', // Registro en Ruat no verificado
  ACTIVO = 'ACTIVO',                                 // Usuario habilitado en Ruat y sistema
  INACTIVO = 'INACTIVO',                             // Usuario deshabilitado,, no podrá reservar ni acceder al sistema
  SANCIONADO = 'SANCIONADO',                         // Tiene sanción activa
  BLOQUEADO = 'BLOQUEADO'                            // Bloqueado por múltiples infracciones o alguna razón administrativa, no podrá reservar
}
export enum EstadoRuat {
  ACTIVO = 'ACTIVO', 
  BAJA = 'BAJA'
}
// Estados de Complejo y Campo Deportivo (estadoActual)
export enum EstadoActual {
  ACTIVO = 'ACTIVO',                       // Disponible para reservas
  MANTENIMIENTO = 'MANTENIMIENTO',         // En mantenimiento, no disponible
  CERRADO = 'CERRADO',                     // Cerrado temporalmente
  EVENTO_MUNICIPAL = 'EVENTO_MUNICIPAL'   // Reservado para evento prioritario
}

