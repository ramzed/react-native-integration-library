package com.evotor.converter.from.js

import android.content.Context
import android.net.Uri
import android.provider.MediaStore
import ru.evotor.devices.commons.printer.printable.IPrintable
import ru.evotor.devices.commons.printer.printable.PrintableBarcode
import ru.evotor.devices.commons.printer.printable.PrintableImage
import ru.evotor.devices.commons.printer.printable.PrintableText
import java.io.IOException
import java.util.ArrayList
import android.graphics.BitmapFactory
import android.graphics.Bitmap
import android.util.Base64



/**
 * Created by a.lunkov on 16.03.2018.
 */
object DeviceReader {

    fun readPrintables(current: Context, source: List<*>): Array<IPrintable> {
        val result = ArrayList<IPrintable>()
        source
                .map { it as Map<*, *> }
                .forEach {
                    when (it["type"] as String) {
                        "TEXT" -> result.add(PrintableText(it["value"] as String))
                        "BARCODE" -> result.add(PrintableBarcode(
                                it["value"] as String,
                                PrintableBarcode.BarcodeType.valueOf(it["barcodeType"] as String))
                        )
                        "IMAGE" -> try {
                            result.add(PrintableImage(
                                    MediaStore.Images.Media.getBitmap(
                                            current.contentResolver,
                                            Uri.parse(it["uri"] as String)
                                    )
                            ))
                        } catch (e: IOException) {
                            e.printStackTrace()
                        }
                        "IMAGEURI" -> try {
                            val decodedString = Base64.decode(it["uri"] as String, Base64.DEFAULT)
                            val decodedByte = BitmapFactory.decodeByteArray(decodedString, 0, decodedString.size)
                            result.add(PrintableImage(decodedByte))
                        } catch (e: IOException) {
                            e.printStackTrace()
                        }

                    }
                }
        return result.toTypedArray()
    }

}