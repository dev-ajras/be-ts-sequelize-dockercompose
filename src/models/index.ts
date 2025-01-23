import { MovementModel } from './movement';

// Datos de ejemplo
const seedMovements = [
    {
        description: "Depósito inicial",
        amount: 150000, // 1500,00
        date: new Date('2024-03-01'),
        origin: "BANCO"
    },
    {
        description: "Pago sueldos",
        amount: -95050, // -950,50
        date: new Date('2024-03-05'),
        origin: "SUELDOS"
    },
    {
        description: "Ingreso por ventas",
        amount: 300000, // 3000,00
        date: new Date('2024-03-10'),
        origin: "VENTAS"
    },
    {
        description: "Compra materiales",
        amount: -75025, // -750,25
        date: new Date('2024-03-15'),
        origin: "SUELDOS"
    },
    {
        description: "Cobro cliente",
        amount: 200000, // 2000,00
        date: new Date('2024-03-20'),
        origin: "BANCO"
    }
];

// Función para cargar datos de ejemplo
const seedInitialData = async () => {
    try {
        const count = await MovementModel.count();
        if (count === 0) {
            await MovementModel.bulkCreate(seedMovements);
            console.log('Datos de ejemplo cargados exitosamente');
        }
    } catch (error) {
        console.error('Error al cargar datos de ejemplo:', error);
    }
};

// Exportar todos los modelos
export {
    MovementModel
};

// Exportar las relaciones si las hay en el futuro
export const setupAssociations = () => {
    // Aquí irían las relaciones entre modelos
};

// Exportar función para inicializar datos
export const initializeData = async () => {
    await seedInitialData();
}; 