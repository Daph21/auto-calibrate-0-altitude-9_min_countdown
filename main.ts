/**
 * Button A...
 * 
 * you can press button A at anytime to check the CO2 reading.  It WILL NOT affect the calibration sequence.
 */
input.onButtonPressed(Button.A, function () {
    basic.showString("" + Math.round(COZIR.Co2()) + " PPM")
    basic.pause(1000)
})
/**
 * Button A+B...
 * 
 * press to begin countdown timer (in minutes) that will automatically launch the calibration sequence when the timer equals 0.  Check mark and CO2 reading showing approximately 400 PPM shows successful calibration. Happy Face appears in case you weren't sure.
 */
input.onButtonPressed(Button.AB, function () {
    basic.clearScreen()
    minute = 9
    basic.showNumber(minute)
    while (!(input.buttonIsPressed(Button.B)) && minute > 0) {
        basic.pause(60000)
        minute += -1
        basic.showNumber(minute)
    }
    if (!(input.buttonIsPressed(Button.B)) && minute == 0) {
        COZIR.calibrateCo2()
        basic.showIcon(IconNames.Yes)
        basic.pause(2000)
        basic.clearScreen()
        basic.showString("" + Math.round(COZIR.Co2()) + " PPM")
        basic.pause(2000)
        basic.showIcon(IconNames.Happy)
    }
})
/**
 * Button B...
 * 
 * DO NOT press button B at anytime unless you want to MANUALLY OVERRIDE THE CALIBRATION sequence and IMMEDIATELY CALIBRATE the COZIR sensor.
 * 
 * If your COZIR is reading "0" this will be necessary to get it to a positive number in order to run a recalibration sequence.
 */
input.onButtonPressed(Button.B, function () {
    basic.showIcon(IconNames.SmallDiamond)
    basic.pause(6000)
    COZIR.calibrateCo2()
    basic.showIcon(IconNames.Yes)
})
/**
 * Altitude...
 * 
 * enter the altitude of your location in metres above sea level.
 */
let minute = 0
serial.redirect(
SerialPin.P0,
SerialPin.P1,
BaudRate.BaudRate9600
)
COZIR.Altitude(0)
basic.showIcon(IconNames.No)
basic.pause(3000)
basic.showIcon(IconNames.Yes)
basic.pause(1000)
