namespace * com.vmesteonline.be.thrift.fileservice
include "error.thrift"

service FileService {
	
	// binary representation of file contrent should have format:
	// url(data:image/png;base64,iVBORw0KGgAAAABJRU5ErkJggg==)
	string saveFileContent( 1:binary data, 2:bool isPublic ) throws (1:error.InvalidOperation exc),
	string copyFileContent( 1:string sourceUrl, 2:bool isPublic ) throws (1:error.InvalidOperation exc),

	string replaceFileFromURL( 1:string oldUrl, 2:string newSourceUrl ) throws (1:error.InvalidOperation exc),
	string replaceFileContent( 1:string oldUrl, 2:binary newData ) throws (1:error.InvalidOperation exc),

	void deleteFile( 1:string url ) throws (1:error.InvalidOperation exc),
}