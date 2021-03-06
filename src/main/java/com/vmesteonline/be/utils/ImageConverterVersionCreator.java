package com.vmesteonline.be.utils;

import com.sun.media.jai.codec.SeekableStream;
import com.vmesteonline.be.jdo2.VoFileAccessRecord;
import com.vmesteonline.be.jdo2.VoFileAccessRecord.VersionCreator;
import org.apache.log4j.Logger;

import javax.jdo.PersistenceManager;
import javax.mail.internet.ContentType;
import javax.media.jai.JAI;
import javax.media.jai.OpImage;
import javax.media.jai.RenderedOp;
import java.awt.*;
import java.awt.image.renderable.ParameterBlock;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Map;

public class ImageConverterVersionCreator implements VersionCreator {

    private PersistenceManager pm;
    private VoFileAccessRecord original;

    public ImageConverterVersionCreator(VoFileAccessRecord orig, ContentType ct, PersistenceManager pm) {
        this.pm = pm;
        this.original = orig;
    }

    @Override
    public VoFileAccessRecord createParametrizedVersion(Map<String, String[]> params, boolean createIfNotExists) {

        Scale scale = extractScale(params);
        Crop crop = extractCrop(params);

        if (null == scale && null == crop)
            return original;


        String versionKey = "image:" +
                (null != scale ? scale.getVersionModificator() : "") +
                (crop != null ? crop.getVersionModificator() : "");

        VoFileAccessRecord version = original.getVersion(versionKey);

        if (version == null && createIfNotExists ) {
            byte[] result = original.getData();
            try {
                SeekableStream s = SeekableStream.wrapInputStream(
                        new ByteArrayInputStream( result ), true);
                RenderedOp image = JAI.create("stream", s);
                ((OpImage) image.getRendering()).setTileCache(null);

                if (scale != null) {

                    RenderingHints qualityHints = new RenderingHints(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);
                    double scalex = (double) scale.x / (double) image.getWidth();
                    double scaley = (double) scale.y / (double) image.getHeight();

                    double minScale =  Math.min(1.0D, Math.max(scalex, scaley));
                    logger.debug("Scale for "+original.getFileName()+" X: "+scalex + "Y:"+scaley+" apply scale is:"+minScale);
                    image = JAI.create("SubsampleAverage", image, minScale, minScale, qualityHints);
                }

                if (crop != null) {
                    ParameterBlock pb = new ParameterBlock();
                    pb.addSource(image); // The source image
                    pb.add((float)Math.min( image.getWidth(), crop.Xlt));
                    pb.add((float)Math.min( image.getHeight(), crop.Ylt));
                    pb.add((float)(Math.min(image.getWidth()- crop.Xlt, crop.Xrb - crop.Xlt)));
                    pb.add((float)(Math.min(image.getHeight()- crop.Ylt,crop.Yrb - crop.Ylt)));
                    image = JAI.create("crop", pb);
                    logger.debug(crop +" for "+original.getFileName() +" size is: w="+image.getWidth()+" h="+image.getHeight());
                }

                ByteArrayOutputStream baos = new ByteArrayOutputStream();
                JAI.create("encode", image, baos, "PNG", null);
                result = baos.toByteArray();


                VoFileAccessRecord newVoFileAccessRecord = new VoFileAccessRecord(original.getUserId(), original.isPublic(),
                        original.getFileName(), original.getContentType(),
                        versionKey, original);
                StorageHelper.saveFileData(result, newVoFileAccessRecord);
                pm.makePersistent(original);
                pm.makePersistent(newVoFileAccessRecord);

                version = newVoFileAccessRecord;

            } catch (IOException e) {
                logger.error("Failed to convert image.", e);
            }
        }
        return version;
    }

    //=================================================================================================
    public static Crop extractCrop(Map<String, String[]> params) {
        String[] cropParams;
        String[] sparams = params.get("s");
        if (null == sparams || 0 == sparams.length || (cropParams = sparams[0].split(",")).length < 4)
            return null;
        try {
            return new Crop(
                    Integer.parseInt(cropParams[0]), Integer.parseInt(cropParams[1]), Integer.parseInt(cropParams[2]), Integer.parseInt(cropParams[3]));
        } catch (NumberFormatException nfe) {

            logger.warn("Failed to parse 's' parameter '" + sparams[0] + "' for crop. Would not be cropped");
            return null;
        }
    }

    //=================================================================================================
    public static Scale extractScale(Map<String, String[]> params) {
        if (null == params.get("w") || params.get("w").length == 0 ||
                null == params.get("h") || params.get("h").length == 0)
            return null;
        String widthStr = params.get("w")[0];
        String heightStr = params.get("h")[0];
        String heightDigitsStr, widthDigitsStr;

        if (widthStr == null || (widthDigitsStr = widthStr.replaceAll("[^0-9]", "")).length() == 0 ||
                heightStr == null || (heightDigitsStr = heightStr.replaceAll("[^0-9]", "")).length() == 0)
            return null;

        return new Scale(Integer.parseInt(widthDigitsStr), Integer.parseInt(heightDigitsStr));
    }

    //=================================================================================================
    public static class Scale {
        public int x;
        public int y;

        public Scale(int x, int y) {
            this.x = x;
            this.y = y;
        }

        public String getVersionModificator() {
            return "sc[" + x + "x" + y + "]";
        }

		/*public Transform getTransform(Image img){
			return ImagesServiceFactory.makeResize(x, y);
		} */
    }

    //=================================================================================================
    public static class Crop {
        public int Xlt, Ylt;
        public int Xrb, Yrb;

        @Override
        public String toString() {
            return "Crop{" +
                    "Xlt=" + Xlt +
                    ", Ylt=" + Ylt +
                    ", Xrb=" + Xrb +
                    ", Yrb=" + Yrb +
                    '}';
        }

        public Crop(int xlt, int ylt, int xrb, int yrb) {
            Xlt = xlt;
            Ylt = ylt;
            Xrb = xrb;
            Yrb = yrb;

        }

        public String getVersionModificator() {
            return "cr[" + Xlt + "," + Ylt + "," + Xrb + "," + Yrb + "]";
        }
		/*public Transform getTransform(Image img){
			float width = img.getWidth();
			float height = img.getHeight();
			float leftX = Math.min(((float)Xlt)/width,1.0F);
			float topY = Math.min(((float)Ylt)/height,1.0F);
			float rightX = Math.min(((float)Xrb)/width,1.0F);
			float bottomY = Math.min(((float)Yrb)/height,1.0F);
			//leftX must be < rightX
			if( leftX == rightX ) 
				if (leftX > 0.01F) leftX -= 0.01F; else rightX += 0.01F;
			//topY must be < bottomY
			if( bottomY == topY ) 
				if (topY > 0.01F) topY -= 0.01F; else bottomY += 0.01F;
			
			return ImagesServiceFactory.makeCrop(
					leftX, topY,
					rightX, bottomY);
		}*/
    }

    //=================================================================================================
    public static Logger logger;

    static {
        logger = Logger.getLogger(ImageConverterVersionCreator.class.getName());
    }

}
