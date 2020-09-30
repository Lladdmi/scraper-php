<?php


namespace App\Controller;


use App\Service\WebsiteSrv;
use Goutte\Client;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Routing\Annotation\Route;

class WebsiteController extends AbstractController
{
    private $websiteSrv;

    /**
     * WebsiteController constructor.
     * @param $websiteSrv
     */
    public function __construct(WebsiteSrv $websiteSrv)
    {
        $this->websiteSrv = $websiteSrv;
    }

    /**
     * @Route("/")
     */
    public function home(){

        $webites = $this->websiteSrv->getAll();
        return $this->render('/website/index.html.twig',[
            'websites' => $webites
        ]);
    }

    /**
     * @Route("/check")
     */
    public function checkUrl(Request $request){
        $url = $request->request->get('url');
        $website = $this->websiteSrv->findByUrl($url);
        $old_html = $website->getHtml();

        $client = new Client();
        $crawler = $client->request('GET', $url);

        $html = $crawler->html();
        $response = $client->getInternalResponse();
        $code = $response->getStatusCode();
        similar_text($old_html, $html, $similarity);

        $result = new JsonResponse();
        $result->setData([
            'status' => $code,
            'new_html' => $html,
            'old_html' => $old_html,
            'similarity' => $similarity
        ]);
        return($result);
    }

    /**
     * @Route("/save")
     */
    public function saveSnapshot(Request $request){
        $client = new Client();
        $url = $request->request->get('url');

        dump($url);

        $crawler = $client->request('GET', $url);

        $html = $crawler->html();

        if (is_null($html)){
            throw new HttpException(Response::HTTP_BAD_REQUEST);
        }

        $response = $client->getInternalResponse();
        $code = $response->getStatusCode();

        $this->websiteSrv->saveHtml($html, $url);

        $result = new JsonResponse();
        $result->setData(['saved' => 'saved']);
        return($result);
    }
}