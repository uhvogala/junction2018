/*
 * Copyright (c) 2018. Daimler AG.
 */

package com.daimler.mbtrucks.dummyApp.repository.vehicle

///
// Declare all your methods in this interface so that interested classes
// could subscribe to new incoming data
///
interface IVehicleDataSubscriber {
    fun onVehicleSpeed(speed: Float)
    fun onTotalVehicleDistance(totalDistance: Long)
}
