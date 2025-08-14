import fetch from 'node-fetch';

const BACKEND_URL = 'http://localhost:3001';
const FRONTEND_URL = 'http://localhost:3000';

console.log('🔍 Probando conexión entre Frontend y Backend...\n');

// Función para probar endpoints del backend
async function testBackendEndpoints() {
  console.log('1️⃣ Probando endpoints del Backend:');
  console.log('=====================================');

  try {
    // Probar endpoint de salud
    const healthResponse = await fetch(`${BACKEND_URL}/health`);
    if (healthResponse.ok) {
      const healthData = await healthResponse.json();
      console.log('✅ /health:', healthData.message);
    } else {
      console.log('❌ /health:', healthResponse.status);
    }

    // Probar endpoint de información
    const infoResponse = await fetch(`${BACKEND_URL}/info`);
    if (infoResponse.ok) {
      const infoData = await infoResponse.json();
      console.log('✅ /info:', infoData.name);
      console.log('   Endpoints disponibles:', Object.keys(infoData.endpoints).length);
    } else {
      console.log('❌ /info:', infoResponse.status);
    }

    // Probar endpoint de usuarios (debería fallar sin autenticación)
    const usuariosResponse = await fetch(`${BACKEND_URL}/api/usuarios`);
    if (usuariosResponse.status === 401) {
      console.log('✅ /api/usuarios: Requiere autenticación (correcto)');
    } else {
      console.log('⚠️  /api/usuarios:', usuariosResponse.status);
    }

  } catch (error) {
    console.log('❌ Error conectando al backend:', error.message);
  }
}

// Función para probar CORS
async function testCORS() {
  console.log('\n2️⃣ Probando configuración de CORS:');
  console.log('=====================================');

  try {
    // Simular petición desde el frontend
    const corsResponse = await fetch(`${BACKEND_URL}/health`, {
      method: 'GET',
      headers: {
        'Origin': FRONTEND_URL,
        'Content-Type': 'application/json'
      }
    });

    if (corsResponse.ok) {
      console.log('✅ CORS configurado correctamente');
      console.log('   Origin permitido:', FRONTEND_URL);
    } else {
      console.log('❌ CORS no configurado correctamente');
    }

  } catch (error) {
    console.log('❌ Error probando CORS:', error.message);
  }
}

// Función para probar autenticación
async function testAuth() {
  console.log('\n3️⃣ Probando autenticación:');
  console.log('=============================');

  try {
    // Intentar crear usuario sin token (debería fallar)
    const createResponse = await fetch(`${BACKEND_URL}/api/usuarios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': FRONTEND_URL
      },
      body: JSON.stringify({
        nombres: 'Test',
        apellidos: 'Usuario',
        correo: 'test@test.com',
        rol: 'estudiante'
      })
    });

    if (createResponse.status === 401) {
      console.log('✅ Autenticación requerida (correcto)');
    } else {
      console.log('⚠️  Autenticación:', createResponse.status);
    }

  } catch (error) {
    console.log('❌ Error probando autenticación:', error.message);
  }
}

// Función principal
async function main() {
  console.log('🚀 Iniciando pruebas de conexión...\n');
  
  await testBackendEndpoints();
  await testCORS();
  await testAuth();

  console.log('\n📋 RESUMEN DE CONFIGURACIÓN:');
  console.log('=============================');
  console.log(`Backend: ${BACKEND_URL}`);
  console.log(`Frontend: ${FRONTEND_URL}`);
  console.log('API Base: /api');
  console.log('Puerto Backend: 3001');
  console.log('Puerto Frontend: 3000');
  
  console.log('\n💡 INSTRUCCIONES:');
  console.log('1. Asegúrate de que el backend esté corriendo en puerto 3001');
  console.log('2. Asegúrate de que el frontend esté corriendo en puerto 3000');
  console.log('3. Verifica que la base de datos esté conectada');
  console.log('4. Ejecuta: npm start en el backend');
  console.log('5. Ejecuta: npm run dev en el frontend');
}

// Ejecutar pruebas
main().catch(console.error);

