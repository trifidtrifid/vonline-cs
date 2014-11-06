package com.vmesteonline.be.jdo2;

import com.vmesteonline.be.thrift.InvalidOperation;
import com.vmesteonline.be.thrift.messageservice.Attach;
import com.vmesteonline.be.thrift.messageservice.Mark;
import com.vmesteonline.be.thrift.messageservice.Message;
import com.vmesteonline.be.thrift.messageservice.MessageType;
import com.vmesteonline.be.utils.StorageHelper;
import com.vmesteonline.be.utils.StorageHelper.FileSource;

import javax.jdo.PersistenceManager;
import javax.jdo.annotations.*;
import java.io.IOException;
import java.nio.charset.Charset;
import java.util.*;


@PersistenceCapable
@Inheritance(strategy = InheritanceStrategy.SUBCLASS_TABLE)
@Indices({
        @Index(name="typeIdx", members = {"type"}),
        @Index(name="lastUpdateIdx", members = {"lastUpdate"}),
        @Index(name="importantScoreIdx", members = {"importantScore"})
})
public abstract class VoBaseMessage /*extends GeoLocation*/ {

	public static final Charset STRING_CHARSET=Charset.forName("UTF-8");
	
	public VoBaseMessage(Message msg, PersistenceManager pm) throws IOException, InvalidOperation {
		// super(msg.getLikesNum(), msg.getUnlikesNum());
		setContent(msg.getContent());
		type = msg.getType();
		authorId = msg.getAuthorId();
		createdAt = msg.getCreated();
		
		images = new ArrayList<Long>();
		documents = new ArrayList<Long>();
		
		importantNotificationSentDate = 0;
		importantScore = 0;
		popularityScore = 0;
		lastUpdate = (int) (System.currentTimeMillis()/1000L);
		
		if (msg.images != null) {
			List<Attach> savedImages = new ArrayList<Attach>();
			for (Attach img : msg.images) {
				VoFileAccessRecord cfar = StorageHelper.loadAttach(pm, msg.getAuthorId(), img);
				images.add( cfar.getId());
				savedImages.add(cfar.getAttach());
			}
			msg.images = savedImages;
		}

		if (msg.documents != null) {
			List<Attach> savedDocs = new ArrayList<Attach>();
			for (Attach doc : msg.documents) {
				FileSource fs = StorageHelper.createFileSource( doc );
				VoFileAccessRecord cfar;
				if( fs == null ){
					cfar = pm.getObjectById(VoFileAccessRecord.class, StorageHelper.getFileId(doc.getURL()));
					cfar.updateContentParams(doc.contentType, doc.fileName);
				}	else {	
					cfar = StorageHelper.saveAttach( fs.fname, fs.contentType, authorId, true, fs.is, pm);
				}
				documents.add( cfar.getId());
				savedDocs.add(cfar.getAttach());
			}
			msg.documents = savedDocs;
		}
        content = msg.getContent().getBytes(STRING_CHARSET);
    }
	
	public int getLastUpdate() {
		return lastUpdate;
	}

	public void setLastUpdate(int lastUpdate) {
		this.lastUpdate = lastUpdate;
	}
	
	@Persistent
	protected int lastUpdate;
	

	public void setCreatedAt(int createdAt) {
		this.createdAt = createdAt;
	}

	public void setAuthorId(Long authorId) {
		this.authorId = authorId;
	}

	public VoBaseMessage() {
	}

	/*
	 * public Key getId() { return id; }
	 */
	public Long getAuthorId() {
		return authorId;
	}

	public MessageType getType() {
		return type;
	}

	public void setType(MessageType type) {
		this.type = type;
	}

	/*
	 * public void setId(Key key) { this.id = key; }
	 */
	public String getContent() {
        if( null==content) return "";
		return new String( content );
	}

	public void setContent(String content) {
        this.content = content.getBytes(STRING_CHARSET);
	}

	public int getCreatedAt() {
		return createdAt;
	}

	public int getChildMessageNum() {
		return childMessageNum;
	}

	public void setChildMessageNum(int childMessageNum) {
		this.childMessageNum = childMessageNum;
	}

	public void incrementChildMessageNum(int deltaNum) {
		this.childMessageNum += deltaNum;
	}
	
	public int getEditedAt() {
		return editedAt;
	}

	public void setEditedAt(int editedAt) {
		this.editedAt = editedAt;
	}

	/*
	 * public VoUserAttitude(int likes, int unlikes) { likesNum = likes; unlikesNum = unlikes; }
	 */
	public int getLikes() {
		return null==likes ? 0 : likes.size();
	}


	public void setImages(List<Long> images) {
		this.images = images;
	}

	public void setDocuments(List<Long> documents) {
		this.documents = documents;
	}

	public int markLikes( VoUser user, VoUser author, PersistenceManager pm) {
		if( null == likes ) likes = new HashSet<Long>();
		if( !likes.contains(user.getId())) {
			int up = user.getPopularuty();
			if( up == 0 ) author.setPopularuty( up = VoUser.BASE_USER_SCORE );
			
			popularityScore += up;
			likes.add(user.getId());
			try{
				if( null==author && 0==authorId )
					author = pm.getObjectById(VoUser.class,authorId);
				int ap = author.getPopularuty();
				if( ap == 0 ) author.setImportancy( ap = VoUser.BASE_USER_SCORE );
				int pDelta = (int) (Math.min( 100, (Math.max(1, up / 10)))); 
				author.setPopularuty( ap + pDelta );
			} catch(Exception e){ 
			}
		}
		pm.makePersistent(this);
		return popularityScore;
	}

	public int markImportant( VoUser user, VoUser author, boolean isImportant, PersistenceManager pm) {
		if( null == important ) important = new HashSet<Long>();
		if( null == unimportant ) unimportant = new HashSet<Long>();
		
		long userId = user.getId();
		int ui = user.getImportancy();
		if( ui == 0 ) user.setImportancy( ui = VoUser.BASE_USER_SCORE );
		
		int importancyK = 1;
		
		//switch important to unimportant or vice versa
		if( important.contains( userId) && !isImportant){
			importantScore -= ui;
			important.remove(userId);
			importancyK = 2;
		} else 	if( unimportant.contains( userId ) && isImportant){
			importantScore += ui;
			unimportant.remove(userId);
			importancyK = 2;
		}
		
		if( !important.contains(userId) && !unimportant.contains(userId)) {
			
			importantScore += ui * ( isImportant ? 1 : -1 ) ;
			
			if( isImportant ) 
				important.add(userId);
			else 
				unimportant.add( userId);
			
			try{
				if( null != author || 0!=authorId && null!= (author = pm.getObjectById(VoUser.class,authorId)) )
					if( author.getId() != user.getId() ){
						int ai = author.getImportancy();
						if( ai == 0 ) author.setImportancy( ai = VoUser.BASE_USER_SCORE );
						int importancyDelta = importancyK * Math.min( 100, (Math.max (1, ui / 10 ))) * ( isImportant ? 1 : -1 );
						author.setImportancy( ai + importancyDelta );
					}
			} catch(Exception e){ 
			}
		}
		pm.makePersistent(this);
		return importantScore;
	}


	
	public int getImportantScore() {
		return importantScore;
	}

	public int getPopularityScore() {
		return popularityScore;
	}

	public Mark isImportant( long userId ){
		return important!=null && important.contains( userId ) ? Mark.POSITIVE : unimportant !=null && unimportant.contains( userId ) ? Mark.NEGATIVE : Mark.NOTMARKED;
	}

	public Mark isLiked( long userId ){
		return likes != null && likes.contains( userId ) ? Mark.POSITIVE : Mark.NOTMARKED;
	}
	
	public int getImportantNotificationSentDate() {
		return importantNotificationSentDate;
	}

	public void setImportantNotificationSentDate(int importantNotificationSentDate) {
		this.importantNotificationSentDate = importantNotificationSentDate;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id =id;
	}

	@PrimaryKey
	@Persistent(valueStrategy = IdGeneratorStrategy.INCREMENT)
	protected long id;

	/*
	 * @PrimaryKey
	 * 
	 * @Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY) protected Key id;
	 */
	@Persistent
	protected byte[] content;

	@Persistent
	protected MessageType type;

    @Persistent(table="vomsgimages")
    @Join(column = "msgid")
    @Element(column = "imageid")
	protected List<Long> images;

    @Persistent(table="vomsgdocuments")
    @Join(column = "msgid")
    @Element(column = "documentid")
    protected List<Long> documents;

	@Persistent
	protected long authorId;

	@Persistent
	protected int createdAt;

	@Persistent
	protected int editedAt;

	protected int childMessageNum;
	
	@Persistent
    @Serialized
	protected Set<Long> likes;
	
	@Persistent
    @Serialized
	protected Set<Long> important;
	@Persistent
    @Serialized
	protected Set<Long> unimportant;
	
	@Persistent
	protected int importantScore;
	
	@Persistent
	protected int popularityScore;
	
	@Persistent
	protected int importantNotificationSentDate;

	public List<Long> getImages() {
		return images;
	}

	public List<Long> getDocuments() {
		return documents;
	}
}
