// Check if required Sanity environment variables are set
const { execSync } = require('child_process');

const requiredVars = [
  'NEXT_PUBLIC_SANITY_DATASET',
  'NEXT_PUBLIC_SANITY_PROJECT_ID'
];

const missingVars = requiredVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.log('⚠️  Skipping typegen: Missing required environment variables:');
  missingVars.forEach(varName => console.log(`   - ${varName}`));
  console.log('   Please set these in Vercel Environment Variables');
  process.exit(0); // Exit successfully, build will continue without typegen
}

// All required vars are present, run typegen
try {
  console.log('✓ Running Sanity typegen...');
  execSync('sanity schema extract', { stdio: 'inherit' });
  execSync('sanity typegen generate', { stdio: 'inherit' });
  process.exit(0);
} catch (error) {
  console.error('✗ Typegen failed:', error.message);
  process.exit(1);
}
