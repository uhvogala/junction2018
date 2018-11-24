/*
 * Copyright (c) 2018. Daimler AG.
 */

package com.daimler.mbtrucks.dummyApp


import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.os.Build
import android.provider.Settings
import android.support.v7.app.AppCompatActivity
import android.util.Log
import android.widget.Toast
import com.daimler.mbtrucks.dummyApp.repository.vehicle.IVehicleDataSubscriber
import com.daimler.mbtrucks.dummyApp.repository.vehicle.VehicleDataRepository
import com.daimler.mbtrucks.dummyApp.services.DataSimulationService
import com.facebook.react.ReactInstanceManager
import com.facebook.react.ReactRootView
import com.facebook.react.common.LifecycleState
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler
import com.facebook.react.shell.MainReactPackage
import com.fleetappreact.BuildConfig

//import kotlinx.android.synthetic.main.activity_main.*



///
// Here we have our basic main activity. This is the entry point of connecting to the vehicle
///
class MainActivity : AppCompatActivity(), IVehicleDataSubscriber, DefaultHardwareBackBtnHandler {

    companion object {
        private const val TAG = "MAIN"
    }



    // Define the variable for our vehicle repository, which will handle the vehicle connection
    // This will be done, when the activity is created
    lateinit var vehicleDataRepository: VehicleDataRepository

    // Define the variable for our data simulation service, which will give us defined simulated
    // values from the vehicle FMS interface or CAN bus
    lateinit var dataSimulationService: DataSimulationService

    // Define a helper variable for tracking if this activity is in foreground. So we are able to
    // handle some things that are not useful while in background
    private var isInForeground: Boolean = false

    private lateinit var mReactRootView : ReactRootView
    private lateinit var mReactInstanceManager : ReactInstanceManager

    private var OVERLAY_PERMISSION_REQ_CODE : Int = 1

    override fun onCreate(savedInstanceState: Bundle?) {

        super.onCreate(savedInstanceState)

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            if (!Settings.canDrawOverlays(this)) {
                val intent = Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                        Uri.parse("package:$packageName"))
                startActivityForResult(intent, OVERLAY_PERMISSION_REQ_CODE)
            }
        }

        mReactRootView = ReactRootView(this)
        mReactInstanceManager = ReactInstanceManager.builder()
                .setApplication(application)
                .setBundleAssetName("index.android.bundle")
                .setJSMainModulePath("index")
                .addPackage(MainReactPackage())
                .setUseDeveloperSupport(BuildConfig.DEBUG)
                .setInitialLifecycleState(LifecycleState.RESUMED)
                .build()
        // The string here (e.g. "MyReactNativeApp") has to match
        // the string in AppRegistry.registerComponent() in index.js
        mReactRootView.startReactApplication(mReactInstanceManager, "MyReactNativeApp", null)

        setContentView(mReactRootView)

        // Here we inject everything defined within the injector like any depending services
        // or repositories
        Injector.inject(this)

        // After having all dependencies, we can now register this activity as a listener on
        // vehicle related messages
        vehicleDataRepository.register(this)

        // Finally just connect this application to the vehicle
        connectVehicle(applicationContext)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        if (requestCode == OVERLAY_PERMISSION_REQ_CODE) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                if (!Settings.canDrawOverlays(this)) {
                    // SYSTEM_ALERT_WINDOW permission not granted
                }
            }
        }
        mReactInstanceManager.onActivityResult(this, requestCode, resultCode, data )
    }

    private fun connectVehicle(context: Context) {
        try {
            if (vehicleDataRepository.initializeSdk(context)) {
                vehicleDataRepository.connectVehicle(context)
                Toast.makeText(context, "Connection to vehicle established", Toast.LENGTH_LONG).show()
            }
        } catch (e: Exception) {
            Log.e(TAG, "Couldn't connect to the vehicle due to $e")
            Toast.makeText(context, "Connection to vehicle couldn't be established", Toast.LENGTH_LONG).show()
        }
    }

    override fun onVehicleSpeed(speed: Float) {
        Log.i(TAG, "Current vehicle speed: $speed km/h")

        // Only do something with incoming values, if the app is in foreground
        if (isInForeground) {
            // Show the new incoming value on the ui
            //txt_speed.text = speed.toInt().toString()
        }
    }

    override fun onTotalVehicleDistance(totalDistance: Long) {
        Log.i(TAG, "Current total vehicle distance: $totalDistance km")

        // Only do something with incoming values, if the app is in foreground
        if (isInForeground) {
            // Show the new incoming value on the ui
            // ...
        }
    }

    override fun onPause() {
        // This activity is not in foreground anymore
        isInForeground = false
        super.onPause()
        if (mReactInstanceManager != null) {
            mReactInstanceManager.onHostPause(this);
        }
    }

    override fun onDestroy() {
        // When the activity is going to be destroyed, we should also clear up everything
        // regarding the vehicle
        super.onDestroy()
        vehicleDataRepository.disconnectVehicle()
        vehicleDataRepository.deinitializeSdk()
        vehicleDataRepository.remove(this)

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onHostDestroy(this)
        }
        if (mReactRootView != null) {
            mReactRootView.destroyDrawingCache()
        }
    }

    override fun onResume() {
        // We're back on... so also tell that our variable
        isInForeground = true
        super.onResume()

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onHostResume(this, this)
        }
    }

    override fun invokeDefaultOnBackPressed() {
        super.onBackPressed()
    }

    override fun onBackPressed() {
        if (mReactInstanceManager != null) {
            mReactInstanceManager.onBackPressed()
        } else {
            super.onBackPressed()
        }
    }
}

