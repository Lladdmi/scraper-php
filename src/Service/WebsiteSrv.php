<?php


namespace App\Service;


use App\Entity\Website;
use App\Repository\WebsiteRepository;

class WebsiteSrv
{
    private $websiteRepository;

    /**
     * WebsiteSrv constructor.
     * @param $websiteRepository
     */
    public function __construct(WebsiteRepository $websiteRepository)
    {
        $this->websiteRepository = $websiteRepository;
    }


    public function getAll()
    {
        return $this->websiteRepository->findAll();
    }

    public function findByUrl($url)
    {
        return $this->websiteRepository->findOneBy(['url' => $url]);
    }

    public function saveHtml($html, $url){
        $website = $this->findByUrl($url);
        $website->setHtml($html);

        dump($html);
        $this->websiteRepository->save($website);
    }


}