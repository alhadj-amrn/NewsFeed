import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import { Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2, 0),
}));
const LoadingArticle = () => {
  return (
    <StyledCard>
      <CardActionArea>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={200} // adjust height to match your image
          sx={{ borderRadius: 2 }}
        />
        <CardContent>
          <Skeleton variant="text" sx={{ fontSize: "5rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
        </CardContent>
      </CardActionArea>
      <Box p={2}>
        <Skeleton variant="text" width={200} sx={{ fontSize: "1.5rem" }} />
        <Skeleton variant="text" width={200} sx={{ fontSize: "1.5rem" }} />
      </Box>
    </StyledCard>
  );
};
export default LoadingArticle;
