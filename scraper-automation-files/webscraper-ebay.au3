#include <MsgBoxConstants.au3>

Example()

Func Example()
    ; Run Notepad
    Run("""c:\Program Files\Git\git-bash.exe""")

    ; Test if the window is activated and display the results.
    If WinActivate("[CLASS:mintty]", "") Then
        MsgBox($MB_SYSTEMMODAL + $MB_ICONWARNING, "Warning", "Window activated" & @CRLF & @CRLF & "May be your system is pretty fast.", 10)
    Else
        ; Notepad will be displayed as MsgBox introduce a delay and allow it.
        MsgBox($MB_SYSTEMMODAL, "", "Window not activated" & @CRLF & @CRLF & "But notepad in background due to MsgBox.", 10)
    EndIf

    ; re Test if the window is now activated and display the results.
    If WinActivate("[CLASS:mintty]", "") Then
        ; MsgBox($MB_SYSTEMMODAL, "", "Window NOW activated")
        ;~ Send("Hello from Notepad.{ENTER}1 2 3 4 5 6 7 8 9 10{ENTER}")
        ; Send("cd /c/marks-code/webdriverio-scraper-fully-working")
        Send("cd /c/marks-code/ebay-tool-final-using-wamp/atomic-games")
        Sleep(2000)
        Send("{ENTER}")
        Sleep(2000)
        Send("./node_modules/.bin/wdio wdio.conf.js && exit")
        Sleep(2000)
        Send("{ENTER}")
;~ Sleep(500)
;~ Send("+{UP 2}")
;~ Sleep(500)

;~ ; Now quit by pressing Alt-F and then scrolling down (simulating the down arrow being pressed six times) to the Exit menu
;~ Send("!f")
;~ Sleep(1000)
;~ Send("{DOWN 6}{ENTER}")

;~ ; Now a screen will pop up and ask to save the changes, the classname of the window is called
;~ ; "#32770" and simulating the "TAB" key to move to the second button in which the "ENTER" is simulated to not "save the file"
;~ WinWaitActive("[CLASS:#32770]")
;~ Sleep(500)
;~ Send("{TAB}{ENTER}")

;~ ; Now wait for Notepad to close before continuing
;~ WinWaitClose("[CLASS:Notepad]")

;~ ; Finished!
    Else
        MsgBox($MB_SYSTEMMODAL + $MB_ICONERROR, "Error", "Window not activated")
    EndIf

;~     ; Close the Notepad window using the handle returned by WinWait.
;~     WinClose("[CLASS:Notepad]", "")
;~ EndFunc   ;==>Example