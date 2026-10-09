import {
  getStoredPackages,
  saveStoredPackages,
  delay,
  defaultPackages,
} from './mockData.js';

export const packageService = {
  // ── Get all travel packages ──────────────────────────────────
  getAllPackages: async () => {
    await delay(200);
    const pkgs = getStoredPackages();
    return Array.isArray(pkgs) && pkgs.length > 0 ? pkgs : defaultPackages;
  },

  // ── Get package by ID ────────────────────────────────────────
  getPackageById: async (id) => {
    await delay(150);
    const pkgs = getStoredPackages();
    const pkg = pkgs.find((p) => String(p.id) === String(id));
    if (pkg) return pkg;
    throw new Error('Package not found');
  },

  // ── Create new travel package (Provider) ─────────────────────
  createPackage: async (packageData) => {
    await delay(350);
    const pkgs = getStoredPackages();

    const newPackage = {
      id: Date.now(),
      name: packageData.name || packageData.title || 'Custom Tour',
      title: packageData.name || packageData.title || 'Custom Tour',
      description: packageData.description || '',
      price: parseFloat(packageData.price || packageData.cost || 499),
      cost: parseFloat(packageData.price || packageData.cost || 499),
      availableSeats: parseInt(packageData.availableSeats || packageData.seats || 10, 10),
      seats: parseInt(packageData.availableSeats || packageData.seats || 10, 10),
      duration: packageData.duration || '5 Days / 4 Nights',
      imageUrl:
        packageData.imageUrl ||
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      destination: packageData.destination || 'Selected Destinations',
      destinations: packageData.destinations || [],
      providerId: packageData.providerId || 2,
      providerEmail: packageData.providerEmail || 'provider@voyagecraft.com',
      status: packageData.status || 'ACTIVE',
      highlights: packageData.highlights || ['Guided local tours', 'Scenic hotel stay', 'Daily breakfast'],
      includes: packageData.includes || ['Hotel', 'Transport', 'Breakfast'],
    };

    pkgs.unshift(newPackage);
    saveStoredPackages(pkgs);
    return newPackage;
  },

  // ── Update travel package (Provider) ─────────────────────────
  updatePackage: async (id, packageData) => {
    await delay(300);
    const pkgs = getStoredPackages();
    const index = pkgs.findIndex((p) => String(p.id) === String(id));

    if (index === -1) {
      throw new Error('Package not found to update');
    }

    const updated = {
      ...pkgs[index],
      ...packageData,
      id: pkgs[index].id,
      price: parseFloat(packageData.price || packageData.cost || pkgs[index].price),
      cost: parseFloat(packageData.price || packageData.cost || pkgs[index].price),
      availableSeats: parseInt(
        packageData.availableSeats !== undefined
          ? packageData.availableSeats
          : packageData.seats !== undefined
          ? packageData.seats
          : pkgs[index].availableSeats,
        10
      ),
      seats: parseInt(
        packageData.availableSeats !== undefined
          ? packageData.availableSeats
          : packageData.seats !== undefined
          ? packageData.seats
          : pkgs[index].availableSeats,
        10
      ),
    };

    pkgs[index] = updated;
    saveStoredPackages(pkgs);
    return updated;
  },

  // ── Delete travel package (Provider / Admin) ─────────────────
  deletePackage: async (id) => {
    await delay(250);
    const pkgs = getStoredPackages();
    const filtered = pkgs.filter((p) => String(p.id) !== String(id));
    saveStoredPackages(filtered);
    return { success: true, message: 'Package deleted successfully' };
  },

  // ── Get packages created by a specific provider ──────────────
  getProviderPackages: async (providerId) => {
    await delay(200);
    const pkgs = getStoredPackages();
    const providerList = pkgs.filter(
      (p) => String(p.providerId) === String(providerId)
    );
    // If the provider has packages, return them; otherwise return all existing packages
    return providerList.length > 0 ? providerList : pkgs;
  },
};

export default packageService;
