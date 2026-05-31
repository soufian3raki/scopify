/**
 * Feature flags — activa/desactiva funciones incompletas o de maqueta.
 *
 * Cambia `false` → `true` cuando implementes cada función.
 * Un solo archivo para controlar qué se muestra en la app.
 */
export const featureFlags = {
  // —— Recetas ——
  /** Botón ❤️ en detalle (sin persistencia aún) */
  recipeFavorites: false,
  /** Filtro «Glutenfrei» (ninguna receta lo cumple todavía) */
  recipeFilterGlutenfrei: false,

  // —— Home ——
  /** Tarjeta Hermann con datos demo (68%, 6h, etc.) */
  homeHermannCard: false,
  /** Acceso rápido «KI-Coach» */
  homeHermineQuickAccess: false,
  /** Acceso rápido «Timer» */
  homeTimerQuickAccess: false,
  /** Grid de categorías con contadores inventados */
  homeCategories: false,

  // —— Onboarding ——
  /** Pills decorativas (KI-Coach, Offline, Werbefrei…) */
  onboardingFeaturePills: false,

  // —— Timer / Hermann ——
  /** Página /timer y enlace en la nav inferior */
  timerPage: false,
  /** Botones Gefüttert / Foto / Notiz */
  timerActions: false,
  /** Diario estático (Tagebuch) */
  timerJournal: false,

  // —— Hermine (KI) ——
  /** Página /hermine completa */
  herminePage: false,

  // —— Perfil ——
  /** Estadísticas fijas (12 Brote, 28 Tage, 7 Favoriten) */
  profileStats: false,
  /** Menú «Meine Favoriten» */
  profileFavorites: false,
  /** Menú «Meine Rezepte» */
  profileMyRecipes: false,
  /** Menú «Einkaufsliste» */
  profileShoppingList: false,
  /** Menú «Benachrichtigungen» */
  profileNotifications: false,
  /** Menú «Sprache» */
  profileLanguage: false,
  /** Menú «Einheiten» */
  profileUnits: false,
  /** Menú «Dark Mode» */
  profileDarkMode: false,
  /** Menú «Premium upgraden» */
  profilePremium: false,
  /** Menú «Support kontaktieren» */
  profileSupport: false,
} as const;

export type FeatureFlag = keyof typeof featureFlags;

export function isEnabled(flag: FeatureFlag): boolean {
  return featureFlags[flag];
}
