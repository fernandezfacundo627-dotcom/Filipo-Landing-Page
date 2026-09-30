export interface BusinessStatus {
  isOpen: boolean;
  statusText: string;
  nextChangeText: string;
  dotColor: "green" | "amber";
}

/**
 * Calcula si Filipo Café Resto Bar está abierto en tiempo real
 * basado en la zona horaria de Salta, Argentina (UTC-3).
 *
 * Horarios:
 * - Lunes a Viernes: 07:30 a 00:00 (medianoche)
 * - Sábados y Domingos: 08:30 a 01:00 (madrugada)
 */
export function getBusinessStatus(now = new Date()): BusinessStatus {
  try {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Argentina/Salta",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
      weekday: "short",
    });

    const parts = formatter.formatToParts(now);
    const weekday = parts.find((p) => p.type === "weekday")?.value || "";
    const hour = parseInt(parts.find((p) => p.type === "hour")?.value || "0", 10);
    const minute = parseInt(parts.find((p) => p.type === "minute")?.value || "0", 10);
    const currentMinutes = hour * 60 + minute;

    const isWeekend = weekday === "Sat" || weekday === "Sun";

    // Madrugadas extendidas del fin de semana (00:00 a 01:00)
    if ((weekday === "Sun" || weekday === "Mon") && currentMinutes < 60) {
      return {
        isOpen: true,
        statusText: "Abierto ahora",
        nextChangeText: "Cierra a la 01:00",
        dotColor: "green",
      };
    }

    if (isWeekend) {
      const openTime = 8 * 60 + 30; // 08:30 = 510 min
      if (currentMinutes >= openTime) {
        return {
          isOpen: true,
          statusText: "Abierto ahora",
          nextChangeText: "Cierra a la 01:00",
          dotColor: "green",
        };
      }
      return {
        isOpen: false,
        statusText: "Cerrado ahora",
        nextChangeText: "Abre hoy 08:30",
        dotColor: "amber",
      };
    }

    // Lunes a Viernes
    const openTime = 7 * 60 + 30; // 07:30 = 450 min
    if (currentMinutes >= openTime) {
      return {
        isOpen: true,
        statusText: "Abierto ahora",
        nextChangeText: "Cierra 00:00",
        dotColor: "green",
      };
    }

    return {
      isOpen: false,
      statusText: "Cerrado ahora",
      nextChangeText: "Abre hoy 07:30",
      dotColor: "amber",
    };
  } catch {
    // Fallback seguro si Intl timeZone fallara
    return {
      isOpen: true,
      statusText: "Abierto hoy",
      nextChangeText: "Desde 07:30",
      dotColor: "green",
    };
  }
}

