import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true
    },
    email : {
        type: String,
        unique: true,
        required : true
    }, 
    password : {
        type: String,
        required : true
    },
    image : {
        type: String,
        default : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABLAAAASwAgMAAACWT1tcAAAACVBMVEV1dXW9vb0AAADCrFVrAAAFT0lEQVR42uza0WkDQRAFQeEcN8mO0rBgFiOEMLbg5KkKoTXvYzndAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgOnrsdg0ffiSxxBJLLLHEkkAsscQSi5dpW4+1uSwzFAuxxBJLLLHEQiyxpr0K77W5LDMUSyzEEkssscQSC7GmvQrvtbksMxRLLMQSSyyxxBILsd5dtX6ncllmKJZYiCWWWGKJJRZiTX0YHpXLMkOxxEIsscQSSyyxEGvqw/CoXJYZiiUWYoklllhiiYVYYoklllhiIZZYYokllliINfWj4VG5LDMUSyzEEkssscQSC7HEEkssscRCLLHEEksssRBr6kfDo3JZZiiWWIglllhiiSUWYoklllhiiYVYYoklllhiIdbUj4ZH5bLMUCyxEEssscQSSyzEEkssscQSC7HEEkssscRCLLHEEksssRBLLLHEEkssxBJLLLHEEguxxBJLLLHEQiyxxBJLLLEQSyyxxBJLLMQSSyyxxBILscQSSyyxxEIsscQSSyyxEEssscQSSyzEEkssscQSC7HEEkssscRCLLHEEksssRBLLLHEEkssxBJLLLHEEguxxBJLLLHEQqzrq9ZrVC7LDMUSC7HEEkssscRCLLHEEksssRBLLLHEEkssxJr86bByWWYolliIJZZYYoklFmKJJZZYYomFWGKJJZZYYiHW5E+HlcsyQ7HEQiyxxBJLLLEQSyyxxBJLLMQSSyyxxBILsSZ/OqxclhmKJRZiiSWWWGKJhViTn4eVyzJDscRCLLHEEksssRDr3bWtn2tzWWYolliIJZZYYoklFmLNfCG2uSwzFEssxBJLLLHEEguxZr4Q21yWGYqFWGKJJZZYYiGWWP9ej7ksMxQLscQSSyyxxEIssQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYIKeuV3Ah99JLLHEEksssSQQSyyxxOJP9d16pu9clhmKJRZiiSWWWGKJhVhvrW39TpvLMkOxxEIsscQSSyyxEOu99GX9nb64LDMUSyzEEkssscQSC7Gur1qvVLksMxRLLMQSSyyxxBILsS6rbb1em8syQ7HEQiyxxBJLLLEQa9qr8F6byzJDscRCLLHEEksssRBrwJ9In6hclhmKJZZYiCWWWGKJJRZTH4ZH5bLMUCyxxEIsscQSSyyxmPowPCqXZYZiiSUWYoklllhiicXUh+FRuSwzFEsssRBLLLHEEksspj4Mj8plmaFYYomFWGKJJZZYYjH1YXhULssMxRJLLMQSSyyxxBKLqQ/Do3JZZiiWWGIhllhiiSWWWEx9GB6VyzJDscQSC7HEEkssscRCrM927pgGgBgGgmD4Q1mUKQ3iZiGM7OLlV2DBggULlmDBggULFiytHg2vymRZQ1iwYAkWLFiwYMESLFiwYMGCJViwYMGCBUurR8OrMlnWEBYsWIIFCxYsWLC0+mF4VSbLGsKCBUuwYMGCBQuWYMGCBQsWLMGCBQsWLFiCBQsWLFiwBAsWLFiwYGn1h9KrMlnWEBYsWIIFCxYsWLAECxYsWLBgCRYsWLBgwdLq0fCqTJY1hAULlmDBggULFizBggULFixYggULFixYsAQLFixYsGAJFixYsGDBEixYsGDBgiVYsGDBggVLsGDBggULlmDBggULFiytPkRzVSbLGsKCBUuwYMGCBQuWYMGCBQsWLMGCBQsWLFiCBQsWLFiwBAsWLFiwYOm9D8eaAzh8fWKGAAAAAElFTkSuQmCC" 
    },
    address : {
        type: Object,
        default : {
            line1: '',
            line2: ''
        }
    },
    gender : {
        type: String,
        default : "Not Selected"
    },
    dob : {
        type: String,
        default: "Not Selected"
    },
    phone: {
        type: String,
        default : '00000000'
    }
    
})

export const userModel = mongoose.model('user', userSchema)