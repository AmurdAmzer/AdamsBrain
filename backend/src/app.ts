import express from 'express'; 
import cors from 'cors'; 


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());   
app.use(express.json());

app.get('/', (req, res) => {
  res.json({message: 'AdamsBrain API is running'});
});

app.get('/api/health', (req, res) => {
  res.json({status: 'OK', timestamp: new Date()});
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});