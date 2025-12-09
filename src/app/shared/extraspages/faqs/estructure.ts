interface ComplexNode {
    name: string;
    children?: ComplexNode[];
}

export const TREE_DATA: ComplexNode[] = [
  {
    name: 'GAMQ',
    children: [
      {
        name: 'Complejos Deportivos',
        children: [
          {
            name: 'Complejo 1',
            children: [
              {
                name: 'Campo Deportivo 1.1',
                children: [
                  { name: 'Horarios' },
                  { name: 'Tarifas' },
                  { name: 'Categoría' },
                  { name: 'Superficie' }
                ]
              },
              { name: 'Campo Deportivo 1.2' },
              { name: 'Campo Deportivo 1.n' }
            ]
          },
          {
            name: 'Complejo 2',
            children: [
              { name: 'Campo Deportivo 2.1' },
              { name: 'Campo Deportivo 2.2' },
              { name: 'Campo Deportivo 2.n' }
            ]
          },
          {
            name: 'Complejo n',
            children: [
              { name: 'Campo Deportivo n.1' },
              { name: 'Campo Deportivo n.2' },
              { name: 'Campo Deportivo n.n' }
            ]
          }
        ]
      }
    ]
  }
];

export const FAQCategory = [
  {
    title: "Preguntas Generales",
    icon: "ri-question-line",
    faqs: [
      {question: "¿Qué es el sistema de Gestión de Emisiones Vehiculares - Provegaq?",
        answer: "Es una plataforma que centraliza la inspección técnica de emisiones de gases, la emisión de certificados, la gestión de multas y el registro de vehículos, con el objetivo de reducir la contaminación ambiental según los reglamentos municipales."
      },
      {
        question: "¿Quiénes pueden usar el sistema?",
        answer: "Personal autorizado de la Dirección de Medio Ambiente, Recaudaciones, y Tráfico."
      },
       {
      question: "¿Cómo crear una actividad?",
      answer: "Desde el módulo Administración > Actividades, haz clic en 'Crear', completa los datos y guarda. La actividad se registrará automáticamente en el calendario del sistema y podrá asociarse a inspecciones."
    },
     {
      question: "¿Cómo crear un evento para una actividad?",
      answer: " Desde el módulo Gestion de Inspecciones > Calendario de Inspecciones, haz clic sobre una fecha en el calendario. Esto abrirá un formulario donde podrás asignar la fecha, hora y ubicación del evento."
    },
    {
      question: "¿Puedo editar los datos de una inspección ya registrada?",
      answer: "No. En el módulo Inspección Técnica solo es posible editar la sección de Documentos Requeridos, lo que incluye la carga, descarga y eliminación de documentos."
    },
    {
      question: "¿Cómo generar un certificado?",
      answer: "El certificado se emite automáticamente al aprobar una inspección periódica. Puedes descargarlo desde el módulo 'Certificados' en Información o Reportes."
    },
    {
      question: "¿Qué documentos necesito para una inspección?",
      answer: "Los requisitos completos se listan en 'Pre-Requisitos' (módulo Administración)."
    },
    {
      question: "¿Cómo registrar un nuevo vehículo en el sistema?",
      answer: "En el módulo Información > Vehículos, completa el formulario con datos del vehículo, propietario y sube una foto del automotor."
    },
    {
      question: "¿Qué contaminantes se miden en las inspecciones?",
      answer: " Los constaminantes admosfericos y sus respectivos límites se configuran en 'Contaminantes Atmosféricos' (Administración)."
    },
     {
      question: "¿Qué hacer si el sistema no carga la imagen del vehículo?",
      answer: "Verifica que el archivo sea JPG/PNG y pese menos de 2MB. Si persiste, contacta al área de TI."
    },
    {
      question: "¿Cómo actualizar los rangos de contaminantes permitidos?",
      answer: "Solo usuarios con rol 'Administrador' pueden editarlos en 'Contaminantes Atmosféricos' (Administración)."
    }
    ]
  },
  {
    title: "Gestión de Cuenta",
    icon: "ri-user-settings-line",
    faqs: [
      {
        question: "¿Qué datos necesito proporcionar para mi registro?",
        answer: "Necesitas proporcionar: 1) Información personal: nombres, apellidos, fecha nacimiento, género y estado civil 2) Documento de identidad: tipo, número y lugar de expedición 3) Información de contacto: celular y correo electrónico 4) Opcionalmente: dirección y NIT."
      },
      {
        question: "¿Puedo modificar mis datos después del registro?",
        answer: "Puedes modificar tu información de contacto y datos opcionales, sin embargo, los datos de identificación (tipo de documento, número y expedición) no pueden ser modificados después del registro inicial debido a la integración con el sistema RUAT."
      },
      {
        question: "¿Qué estados puede tener mi cuenta?",
        answer: "Tu cuenta puede estar en dos estados: 1) Activo: con acceso completo al sistema para realizar reservas y modificar datos personales 2) Bloqueado: solo permite visualización de datos históricos."
      },
      {
        question: "¿Qué necesito para registrarme?",
        answer: "Necesitas: 1) Tu documento de identidad 2) Un correo electrónico válido 3) Tus datos personales básicos como nombres, apellidos, fecha de nacimiento y estado civil."
      },
      {
        question: "¿Cómo funciona el proceso de verificación?",
        answer: "El proceso incluye una verificación inicial en RUAT con tu documento de identidad, seguido de una verificación de correo electrónico donde recibirás un código de 4 dígitos que deberás ingresar en el sistema."
      },
      {
        question: "¿Cuáles son mis credenciales iniciales?",
        answer: "Tus credenciales iniciales serán: Usuario: Tu número de documento de identidad. Contraseña: Tu número de documento de identidad. Se recomienda cambiar la contraseña inmediatamente después del primer inicio de sesión."
      },
      {
        question: "¿Qué hago si olvido mi contraseña?",
        answer: "Puedes usar la opción 'Olvidaste tu contraseña?' en la página de inicio de sesión. Recibirás un enlace de recuperación en tu correo electrónico registrado. Este enlace es válido por 24 horas."
      },
      {
        question: "¿Cómo puedo cambiar mi contraseña?",
        answer: "Para cambiar tu contraseña debes: 1) Acceder al sistema con tus credenciales 2) Ir a 'Configuraciones' 3) Seleccionar 'Cambiar Contraseña' 4) Seguir las instrucciones en pantalla."
      }
    ]
  },
  {
    title: "Privacidad y Seguridad",
    icon: "ri-shield-keyhole-line",
    faqs: [
      {
        question: "¿Cómo puedo mantener segura mi cuenta?",
        answer: "Recomendamos: 1) Usar una contraseña de al menos 8 caracteres combinando letras, números y símbolos 2) No compartir tus credenciales 3) Cerrar sesión al terminar de usar el sistema 4) Evitar usar información personal fácil de adivinar en tu contraseña"
      },
      {
        question: "¿Por qué necesito verificar mi correo electrónico?",
        answer: "La verificación del correo electrónico es necesaria para garantizar la seguridad de tu cuenta y asegurar que podamos enviarte información importante sobre tus reservas y recuperación de contraseña."
      },
      {
        question: "¿Por cuánto tiempo es válido el enlace de recuperación de contraseña?",
        answer: "Por razones de seguridad, el enlace de recuperación de contraseña es válido únicamente por 24 horas desde el momento en que se solicita."
      },
      {
        question: "¿Qué debo hacer si sospecho que alguien más está usando mi cuenta?",
        answer: "Si sospechas actividad no autorizada en tu cuenta: 1) Cambia tu contraseña inmediatamente 2) Verifica tus últimas reservas 3) Contacta con soporte técnico para reportar la situación."
      },
      {
        question: "¿Cómo se protege mi información personal?",
        answer: "Tu información se maneja según las normativas de protección de datos vigentes. El acceso está restringido según roles de usuario, se mantiene un registro de modificaciones, y la integración con RUAT asegura la validez de los datos de identificación."
      },
      {
        question: "¿Quién puede ver mis datos personales?",
        answer: "Como contribuyente, solo tú puedes ver tus datos completos. Los administradores y encargados tienen acceso limitado según sus permisos, siempre respetando las normativas de protección de datos."
      },
      {
        question: "¿Dónde puedo encontrar los Términos y Condiciones Generales?",
        answer: "Puedes acceder a nuestros Términos y Condiciones Generales completos a través del enlace directo que se encuentra en la parte inferior de cada página. Estos términos describen cómo se manejan los datos personales y la privacidad de los usuarios en nuestro sistema de reserva de instalaciones deportivas."
      },
      {
        question: "¿Dónde puedo encontrar la Política de Privacidad?",
        answer: "Nuestra Política de Privacidad está disponible a través del enlace directo en el pie de página. Este documento detalla cómo recopilamos, utilizamos y protegemos su información personal."
      },
      {
        question:"¿Qué es RUAT y por qué es necesario?",
        answer:"RUAT (Registro Único para la Administración Tributaria) es la plataforma oficial para:1) Verificar su registro como contribuyente 2) Generar las tasas de pago 3) Gestionar los pagos de manera transparente y legal 4) Validar el estado de sus reservas"  
      },
      {
        question: "¿Por qué necesito mi consentimiento para RUAT?",
        answer:"Su consentimiento es necesario para generar la tasa a través de RUAT, lo cual es esencial para procesar su reserva. Sin este consentimiento, no es posible completar el proceso de reserva."
      }
    ]
  }
];
