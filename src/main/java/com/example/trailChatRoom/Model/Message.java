package com.example.trailChatRoom.Model;

public class Message {

	
	 private String name;
	    private String content;

		private String room;

	public String getRoom() {
		return room;
	}

	public void setRoom(String room) {
		this.room = room;
	}

	public Message(String name, String content,String room) {
	        this.name = name;
	        this.content = content;
			this.room=room;
	    }


	    public String getName() {
	        return name;
	    }

	    public void setName(String name) {
	        this.name = name;
	    }

	    public String getContent() {
	        return content;
	    }

	    public void setContent(String content) {
	        this.content = content;
	    }
	
	
}
