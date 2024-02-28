import { Router } from 'express';
import { Vehicle, VehicleDocument } from '../models/vehicle.model';
import { IVehicle } from '@tenderd/shared/interfaces/vehicle.interface';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Vehicles
 *   description: Vehicle management
 */

/**
 * @swagger
 * /vehicles:
 *   get:
 *     summary: Returns a list of all vehicles
 *     tags: [Vehicles]
 *     responses:
 *       200:
 *         description: A list of vehicles.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vehicle'
 *       500:
 *         description: Error fetching vehicles
 */
router.get('/', async (req, res) => {
    try {
        const vehicles: VehicleDocument[] = await Vehicle.find();
        res.json(vehicles);
    } catch (err) {
        res.status(500).send({ message: 'Error fetching all vehicles', err });
    }
});

/**
 * @swagger
 * /vehicles/{id}:
 *   get:
 *     summary: Get a vehicle by ID
 *     tags: [Vehicles]
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description: Vehicle ID
 *     responses:
 *       200:
 *         description: Vehicle object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       404:
 *         description: Vehicle not found
 *       500:
 *         description: Error fetching vehicle
 */
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const vehicle = await Vehicle.findById(id);

        if (!vehicle) {
            return res.status(404).send({ message: 'Vehicle not found' });
        }

        res.json(vehicle);
    } catch (err) {
        res.status(500).send({ message: 'Error fetching vehicle', err });
    }
});

/**
 * @swagger
 * /vehicles:
 *   post:
 *     summary: Create a new vehicle
 *     tags: [Vehicles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vehicle'
 *     responses:
 *       201:
 *         description: Vehicle created
 *       400:
 *         description: Error creating vehicle
 */
router.post('/', async (req, res) => {
    const vehicleData: IVehicle = req.body;
    try {
        const newVehicle: VehicleDocument = new Vehicle(vehicleData);
        await newVehicle.save();
        res.status(201).json(newVehicle);
    } catch (error) {
        res.status(400).send({ message: 'Error registering vehicle', error });
    }
});

/**
 * @swagger
 * /vehicles/{id}:
 *   put:
 *     summary: Update an existing vehicle
 *     tags: [Vehicles]
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description: Vehicle ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vehicle'
 *     responses:
 *       200:
 *         description: Vehicle updated successfully
 *       404:
 *         description: Vehicle not found
 *       500:
 *         description: Error occurred while updating the vehicle
 */
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const vehicleData: IVehicle = req.body;
    try {
        const updatedVehicle = await Vehicle.findByIdAndUpdate(id, vehicleData, { new: true });
        if (!updatedVehicle) {
            return res.status(404).send({ message: 'Vehicle not found' });
        }
        res.status(200).json(updatedVehicle);
    } catch (error) {
        res.status(500).send({ message: 'Error updating vehicle', error });
    }
});

/**
 * @swagger
 * /vehicles/{id}:
 *   delete:
 *     summary: Delete a vehicle by ID
 *     tags: [Vehicles]
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description: Vehicle ID to delete
 *     responses:
 *       200:
 *         description: Vehicle deletedsuccessfully
 *       404:
 *         description: Vehicle not found
 *       500:
 *         description: Error occurred while deleting the vehicle
 */
router.delete('/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const result = await Vehicle.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).send({ message: 'Vehicle not found' });
        }
        res.status(200).send({ message: 'Vehicle deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error occurred while deleting the vehicle', error });
    }
});

export default router;
