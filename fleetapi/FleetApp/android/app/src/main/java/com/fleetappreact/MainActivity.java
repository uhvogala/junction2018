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

    // TODO: Needed?
    // TODO: We probably always want to send data to backend no matter if the app is in foreground
    private Boolean isInForeground = false;

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

    @Override
    protected void onPause() {
        isInForeground = false;
        super.onPause();
    }

    @Override
    protected void onResume() {
        isInForeground = true;
        super.onResume();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();

        vehicleDataRepository.disconnectVehicle();
        vehicleDataRepository.deinitializeSdk();
        vehicleDataRepository.remove(this);
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
        emitVehicleMessage("speed", String.format("%.2f", speed));//Float.toString(speed));
    }

    // Total distance updated
    @Override
    public void onTotalVehicleDistance(long totalDistance) {
        // TODO: Remove
    }

    @Override
    public void onFuelConsumption(float fuelConsumption) {
        emitVehicleMessage("fuelConsumption", String.format("%.2f", fuelConsumption * 100.0f));//Float.toString(fuelConsumption));
    }

    @Override
    public void onFuelLevel(float fuelLevel) {
        emitVehicleMessage("fuelLevel", String.format("%.2f", fuelLevel));//Float.toString(fuelLevel));
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
