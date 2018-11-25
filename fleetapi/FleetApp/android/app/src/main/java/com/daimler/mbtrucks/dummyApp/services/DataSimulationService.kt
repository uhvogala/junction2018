/*
 * Copyright (c) 2018. Daimler AG.
 */

package com.daimler.mbtrucks.dummyApp.services

import android.os.Handler
import android.util.Log
import com.daimler.mbtrucks.dummyApp.repository.vehicle.VehicleDataRepository.handleMessage
import com.fleetboard.sdk.lib.vehicle.ValidState
import com.fleetboard.sdk.lib.vehicle.VehicleMessage
import com.fleetboard.sdk.lib.vehicle.VehicleTopicConsts
import java.util.*

///
// Helper service for simulating incoming data from the FMS interface or CAN bus
///
object DataSimulationService {
    init {
        getDataFromSensor()
    }

    // Simulate data coming from the sensors every time interval [2sec]
    private fun getDataFromSensor() {
        val handler = Handler()

        var timePassed = 0

        val maxFuelLevel = 200.0f
        var currentFuelLevel = 100.0f

        var currentFuelConsumption = 0.45f
        val maxFuelConsumption = 1.0f

        var currentSpeed = 60.0f
        val speedMin = 40.0f
        val speedMax = 80.0f

        var distance = 0f

        val r = Random()

        val runnable = object : Runnable {
            override fun run() {
                // Distance = speed (km/h) * time (s => / 3600)
                distance += (currentSpeed * (2f / 3600f))

                // Update speed and fuel consumption every 0.1 seconds
                val randSpeedDifference = -2.0f + (r.nextFloat() * 4.0f) // Between -2 and 2
                currentSpeed += randSpeedDifference //60.0f + r.nextFloat() * 40.0f
                currentSpeed = Math.min(Math.max(currentSpeed, speedMin), speedMax)

                val randFuelConsumptionDifference: Float = -0.03f + (r.nextFloat() * 0.06f) // between -0.03 and 0.03
                currentFuelConsumption += randFuelConsumptionDifference //0.1f + r.nextFloat() * 0.89f
                currentFuelConsumption = Math.max(Math.min(currentFuelConsumption, maxFuelConsumption), 0.0f)

                handleMessage(VehicleMessage(VehicleTopicConsts.VEHICLE_SPEED, currentSpeed, ValidState.VALID))
                handleMessage(VehicleMessage(VehicleTopicConsts.CURRENT_FUEL_CONSUMPTION, currentFuelConsumption, ValidState.VALID))
                handleMessage(VehicleMessage(VehicleTopicConsts.TOTAL_VEHICLE_DISTANCE, distance.toLong(), ValidState.VALID))

                // Every 6 seconds
                if (timePassed.rem(6000) == 0) {
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

                timePassed += 500
                handler.postDelayed(this, 500)
            }
        }
        handler.postDelayed(runnable, 2000)
    }
}
