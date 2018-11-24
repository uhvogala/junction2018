/*
 * Copyright (c) 2018. Daimler AG.
 */

package com.daimler.mbtrucks.dummyApp.services

import android.os.Handler
import com.daimler.mbtrucks.dummyApp.repository.vehicle.VehicleDataRepository.handleMessage
import com.fleetboard.sdk.lib.vehicle.ValidState
import com.fleetboard.sdk.lib.vehicle.VehicleMessage
import com.fleetboard.sdk.lib.vehicle.VehicleTopicConsts
import java.util.*

///
// Helper service for simulating incoming data from the FMS interface or CAN bus
///
object DataSimulationService {

    // Define a set of messages
    var messages: Array<VehicleMessage> = arrayOf(
            VehicleMessage(VehicleTopicConsts.CURRENT_FUEL_CONSUMPTION, 11.2f, ValidState.VALID),
            VehicleMessage(VehicleTopicConsts.CURRENT_FUEL_CONSUMPTION, 10.2f, ValidState.VALID),
            VehicleMessage(VehicleTopicConsts.CURRENT_FUEL_CONSUMPTION, 10.7f, ValidState.VALID),
            VehicleMessage(VehicleTopicConsts.CURRENT_FUEL_CONSUMPTION, 11.3f, ValidState.VALID),
            VehicleMessage(VehicleTopicConsts.CURRENT_FUEL_CONSUMPTION, 11.8f, ValidState.VALID),
            VehicleMessage(VehicleTopicConsts.FUEL_LEVEL, 60.7f, ValidState.VALID),
            VehicleMessage(VehicleTopicConsts.FUEL_LEVEL, 59.8f, ValidState.VALID),
            VehicleMessage(VehicleTopicConsts.FUEL_LEVEL, 58.9f, ValidState.VALID),
            VehicleMessage(VehicleTopicConsts.FUEL_LEVEL, 58.0f, ValidState.VALID),
            VehicleMessage(VehicleTopicConsts.FUEL_LEVEL, 57.1f, ValidState.VALID),
            VehicleMessage(VehicleTopicConsts.FUEL_LEVEL, 56.2f, ValidState.VALID),
            VehicleMessage(VehicleTopicConsts.VEHICLE_SPEED, 9.3f, ValidState.VALID),
            VehicleMessage(VehicleTopicConsts.VEHICLE_SPEED, 25.4f, ValidState.VALID),
            VehicleMessage(VehicleTopicConsts.VEHICLE_SPEED, 45.4f, ValidState.VALID),
            VehicleMessage(VehicleTopicConsts.VEHICLE_SPEED, 65.4f, ValidState.VALID),
            VehicleMessage(VehicleTopicConsts.VEHICLE_SPEED, 85.4f, ValidState.VALID),
            VehicleMessage(VehicleTopicConsts.VEHICLE_SPEED, 91.4f, ValidState.VALID),
            VehicleMessage(VehicleTopicConsts.TOTAL_VEHICLE_DISTANCE, 134586L, ValidState.VALID),
            VehicleMessage(VehicleTopicConsts.VEHICLE_SPEED, 93.4f, ValidState.VALID),
            VehicleMessage(VehicleTopicConsts.VEHICLE_SPEED, 95.4f, ValidState.VALID),
            VehicleMessage(VehicleTopicConsts.VEHICLE_SPEED, 87.4f, ValidState.VALID),
            VehicleMessage(VehicleTopicConsts.VEHICLE_SPEED, 90.4f, ValidState.VALID))

    init {
        getDataFromSensor()
    }

    // Simulate data coming from the sensors every time interval [2sec]
    private fun getDataFromSensor() {
        val handler = Handler()
        var timesUpdated = 0
        val maxFuelLevel = 200.0f
        var currentFuelLevel = 100.0f
        val r = Random()

        //var initSpeed = 100.0

        //var element = 0

        val runnable = object : Runnable {
            override fun run() {
                // Update speed and fuel consumption every two seconds
                val randomSpeed: Float = 60.0f + r.nextFloat() * 40.0f
                val randomFuelConsumption: Float = 0.1f + r.nextFloat() * 0.89f
                handleMessage(VehicleMessage(VehicleTopicConsts.VEHICLE_SPEED, randomSpeed, ValidState.VALID))
                handleMessage(VehicleMessage(VehicleTopicConsts.CURRENT_FUEL_CONSUMPTION, randomFuelConsumption, ValidState.VALID))

                // Update fuel level every three times
                if (timesUpdated.rem(3) == 0) {
                    // 2 % of the time refuel random amount
                    if (r.nextFloat() < 0.02f) {
                        // refuel between 30 and 55 liters
                        currentFuelLevel += 30.0f + r.nextFloat() * 25.0f
                        // Do not allow fuel level to exceed set maximum
                        if (currentFuelLevel > maxFuelLevel) { currentFuelLevel = maxFuelLevel }
                    } else { // otherwise decrease by random amount between 0.1 and 0.99 liters
                        currentFuelLevel -= 0.1f + r.nextFloat() * 0.89f
                    }

                    handleMessage(VehicleMessage(VehicleTopicConsts.FUEL_LEVEL, currentFuelLevel, ValidState.VALID))
                }

                timesUpdated += 1
                handler.postDelayed(this, 2000)
            }
        }
        handler.postDelayed(runnable, 2000)
    }
}
