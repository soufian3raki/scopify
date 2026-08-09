# Instrucciones para subir a Google Play Store

He preparado el proyecto para la versión de producción. Aquí tienes los pasos restantes y los archivos que necesitarás.

## 1. Generar el Keystore (Firma de la App)
Para que Google acepte tu app, debe estar firmada. Ejecuta este comando en la terminal de Android Studio para crear tu llave de firma (cambia `tu_contraseña` por una segura):

```powershell
keytool -genkey -v -keystore play_store/superbaking-release.keystore -alias superbaking-alias -keyalg RSA -keysize 2048 -validity 10000
```

**IMPORTANTE:** Guarda bien este archivo `.keystore` y las contraseñas. Si los pierdes, no podrás actualizar la app nunca.

## 2. Generar el Bundle (AAB)
Una vez tengas el keystore:
1. En Android Studio, ve a **Build > Generate Signed Bundle / APK...**
2. Selecciona **Android App Bundle** y pulsa Next.
3. En "Keystore path", busca el archivo que creaste en el paso 1.
4. Introduce el alias y las contraseñas.
5. Selecciona la variante **release**.
6. El archivo final `.aab` aparecerá en `android/app/release/`. Ese es el archivo que debes subir a la consola de Google.

## 3. Checklist para Google Play Console
Cuando crees la ficha en la consola, asegúrate de tener:
- [ ] **Título**: Trustbread (máx 50 caracteres).
- [ ] **Descripción corta**: Tu compañero digital para el pan de masa madre perfecto.
- [ ] **Descripción larga**: (Usa el contenido de tu archivo ESTADO-FUNCIONALIDAD.md para inspirarte).
- [ ] **Icono**: 512x512px (PNG/WebP).
- [ ] **Gráfico de funciones**: 1024x500px.
- [ ] **Capturas de pantalla**: Al menos 2 de móvil.
- [ ] **Política de Privacidad**: URL pública `https://TU-DOMINIO/privacy_policy/` (página incluida en la app: `/privacy_policy/`).

## Cambios realizados en el código:
- He activado `minifyEnabled` y `shrinkResources`. Esto hará que tu app sea mucho más pequeña y segura eliminando código y recursos que no se usan.
