package com.fleetappreact;

import android.os.Bundle;
import android.os.Handler;

import com.daimler.mbtrucks.dummyApp.Injector;
import com.daimler.mbtrucks.dummyApp.repository.vehicle.IVehicleDataSubscriber;
import com.daimler.mbtrucks.dummyApp.repository.vehicle.VehicleDataRepository;
import com.daimler.mbtrucks.dummyApp.services.DataSimulationService;
import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class MainActivity extends ReactActivity implements IVehicleDataSubscriber {
    public VehicleDataRepository vehicleDataRepository;
    public DataSimulationService dataSimulationService;

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "MyReactNativeApp";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Inject values to vehicle data repo and data sim service
        Injector.INSTANCE.inject(this);

        vehicleDataRepository.register(this);

        // Hack to wait for ReactContext to be available
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                connectVehicle(getReactNativeHost().getReactInstanceManager().getCurrentReactContext());
            }
        }, 1000);
    }

    // Connect to sdk
    private void connectVehicle(ReactContext reactContext) {
        try {
            if (vehicleDataRepository.initializeSdk(reactContext)) {
                vehicleDataRepository.connectVehicle(reactContext);
                // TODO: Toast???
            }
        } catch (Exception e) {
            // TODO: Toast???
        }
    }

    // Speed updated
    @Override
    public void onVehicleSpeed(float speed) {
        emitVehicleMessage("speed", Float.toString(speed));
    }

    // Total distance updated
    @Override
    public void onTotalVehicleDistance(long totalDistance) {

    }

    // Emit event to react-native
    private void emitVehicleMessage(String identifier, String value) {
        ReactContext reactContext = getReactNativeHost().
                getReactInstanceManager().getCurrentReactContext();
        WritableMap writableMap = Arguments.createMap();
        writableMap.putString("name", identifier);
        writableMap.putString("returnValue", value);
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).
                emit("onVehicleDataChanged", writableMap);
    }
}
