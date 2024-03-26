<?php

namespace App\Form;

use App\Entity\Partidas;
use App\Entity\User;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PartidasType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('acabada')
            ->add('turno')
            ->add('fila1')
            ->add('fila2')
            ->add('fila3')
            ->add('fila4')
            ->add('fila5')
            ->add('fila6')
            ->add('fila7')
            ->add('jugador1', EntityType::class, [
                'class' => User::class,
'choice_label' => 'id',
            ])
            ->add('jugador2', EntityType::class, [
                'class' => User::class,
'choice_label' => 'id',
            ])
            ->add('ganador', EntityType::class, [
                'class' => User::class,
'choice_label' => 'id',
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Partidas::class,
        ]);
    }
}
