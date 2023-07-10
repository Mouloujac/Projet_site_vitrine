<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use App\Mail\ContactFormEmail;

class ContactController extends Controller
{
    public function sendEmail(Request $request)
    {
        // Validez les données du formulaire si nécessaire
        $validatedData = $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'message' => 'required',
        ]);

        try {
            // Envoyez l'e-mail avec les données du formulaire
            Mail::to('theolecolley@gmail.com')
                ->send(new ContactFormEmail($validatedData));

            // Répondez avec la confirmation ou toute autre réponse souhaitée
            return response()->json(['message' => 'Votre message a été envoyé avec succès'], 200);
        } catch (\Exception $e) {
            // Gestion des erreurs d'envoi d'e-mail
            Log::error('Erreur lors de l\'envoi de l\'e-mail: ' . $e->getMessage());
            return response()->json(['message' => 'Une erreur s\'est produite lors de l\'envoi du message'], 500);
        }
    }
}
